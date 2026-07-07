"use client";

import { IconButton, RevealFx } from "@once-ui-system/core";
import { useEffect, useRef, useState } from "react";

import styles from "./HomeHero.module.scss";

export const HomeHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

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
    };

    playVideo();
    window.addEventListener("load", playVideo);
    window.addEventListener("pageshow", playVideo);

    return () => {
      window.removeEventListener("load", playVideo);
      window.removeEventListener("pageshow", playVideo);
    };
  }, []);

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
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <track
            kind="captions"
            src="/hero-captions.vtt"
            srcLang="en"
            label="English captions"
            default
          />
        </video>
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
