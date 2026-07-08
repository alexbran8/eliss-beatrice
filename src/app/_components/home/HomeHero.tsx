"use client";

import { IconButton, RevealFx } from "@once-ui-system/core";
import { useLocale } from "next-intl";
import { type CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getLocalizedMetadata } from "@/resources/locales";

import styles from "./HomeHero.module.scss";

const heroVideoDuration = 17;

const heroTextTiming = [
  { id: "begins", startAt: 2, duration: 2.5 },
  { id: "color", startAt: 6, duration: 2.5 },
  { id: "light", startAt: 10, duration: 2.5 },
  { id: "felt", startAt: 13, duration: 3 },
] as const;

export const HomeHero = () => {
  const locale = useLocale();
  const localized = getLocalizedMetadata(locale);
  const heroTextSlides = useMemo(
    () =>
      heroTextTiming.map((slide) => ({
        ...slide,
        lines: localized.pages.home.heroSlides[slide.id],
      })),
    [localized],
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeSlideRef = useRef<string | null>(null);
  const previousVideoTimeRef = useRef(0);
  const textCycleStartedAtRef = useRef<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSlideId, setActiveSlideId] = useState<string | null>(null);

  useEffect(() => {
    const playVideo = () => {
      const video = videoRef.current;

      if (!video) {
        return;
      }

      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {
        // Browsers may still block autoplay in low-power or data-saver modes.
      });

      textCycleStartedAtRef.current ??= performance.now();
    };

    playVideo();
    window.addEventListener("load", playVideo);
    window.addEventListener("pageshow", playVideo);

    return () => {
      window.removeEventListener("load", playVideo);
      window.removeEventListener("pageshow", playVideo);
    };
  }, []);

  const resetTextCycle = useCallback(() => {
    textCycleStartedAtRef.current = performance.now();
    activeSlideRef.current = null;
    setActiveSlideId(null);
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const syncTextToVideo = () => {
      const video = videoRef.current;

      if (video && textCycleStartedAtRef.current) {
        if (video.currentTime + 0.5 < previousVideoTimeRef.current) {
          resetTextCycle();
        }

        previousVideoTimeRef.current = video.currentTime;

        const currentTime =
          ((performance.now() - textCycleStartedAtRef.current) / 1000) % heroVideoDuration;
        const activeSlide =
          heroTextSlides.find(
            ({ startAt, duration }) => currentTime >= startAt && currentTime < startAt + duration,
          ) ?? null;
        const nextSlideId = activeSlide?.id ?? null;

        if (activeSlideRef.current !== nextSlideId) {
          activeSlideRef.current = nextSlideId;
          setActiveSlideId(nextSlideId);
        }
      }

      animationFrame = window.requestAnimationFrame(syncTextToVideo);
    };

    animationFrame = window.requestAnimationFrame(syncTextToVideo);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [heroTextSlides, resetTextCycle]);

  const toggleMute = () => {
    const video = videoRef.current;
    const nextMuted = !isMuted;

    if (video) {
      video.muted = nextMuted;
      video.play().catch(() => {
        // User intent came from the button, but playback can still fail in restricted modes.
      });
    }

    setIsMuted(nextMuted);
  };

  return (
    <section className={styles.hero} aria-label="Hero video">
      <RevealFx fillWidth className={styles.videoReveal}>
        <video
          ref={videoRef}
          className={styles.video}
          src="/hero_no_text.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onEnded={resetTextCycle}
          onSeeked={resetTextCycle}
        >
          <track
            kind="captions"
            src="/hero-captions.vtt"
            srcLang="en"
            label="English captions"
            default
          />
        </video>
        <div className={styles.textOverlay} aria-hidden="true">
          {heroTextSlides.map(({ id, duration, lines }) => (
            <p
              key={id}
              className={`${styles.textSlide} ${activeSlideId === id ? styles.textSlideActive : ""}`}
              style={{ "--slide-duration": `${duration}s` } as CSSProperties}
            >
              {lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          ))}
        </div>
        <div className={styles.muteControl}>
          <IconButton
            icon={isMuted ? "volumeOff" : "volumeOn"}
            variant="secondary"
            size="l"
            tooltip={isMuted ? "Unmute video" : "Mute video"}
            tooltipPosition="left"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          />
        </div>
      </RevealFx>
    </section>
  );
};
