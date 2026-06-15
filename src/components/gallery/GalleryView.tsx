"use client";

import { type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { IconButton, MasonryGrid } from "@once-ui-system/core";
import { gallery } from "@/resources";
import styles from "./GalleryView.module.scss";

function getImageTitle(image: (typeof gallery.images)[number], index: number) {
  if (image.title) return image.title;

  const filename = image.src.split("/").pop()?.replace(/\.[^.]+$/, "");
  if (!filename) return `Artwork ${index + 1}`;

  return filename.replace(/[_-]+/g, " ");
}

export default function GalleryView() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastWheelTime = useRef(0);

  const closeImage = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPreviousImage = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;

      return currentIndex === 0 ? gallery.images.length - 1 : currentIndex - 1;
    });
  }, []);

  const showNextImage = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex;

      return currentIndex === gallery.images.length - 1 ? 0 : currentIndex + 1;
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeImage();
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        showNextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeImage, showNextImage, showPreviousImage]);

  const activeImage = activeIndex === null ? null : gallery.images[activeIndex];

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaY) < 20) return;

    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;

    lastWheelTime.current = now;

    if (event.deltaY > 0) {
      showNextImage();
    } else {
      showPreviousImage();
    }
  };

  return (
    <>
      <MasonryGrid columns={2} s={{ columns: 1 }}>
        {gallery.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Open ${getImageTitle(image, index)}`}
            className={styles.thumbnail}
            onClick={() => setActiveIndex(index)}
          >
            <img src={image.src} alt={image.alt} loading={index < 10 ? "eager" : "lazy"} />
            <span className={styles.title}>{getImageTitle(image, index)}</span>
          </button>
        ))}
      </MasonryGrid>

      {activeImage && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          onClick={closeImage}
          onWheel={handleWheel}
        >
          <div className={styles.toolbar} onClick={(event) => event.stopPropagation()}>
            <IconButton
              icon="close"
              tooltip="Close"
              variant="secondary"
              onClick={closeImage}
              aria-label="Close gallery image"
            />
          </div>

          <IconButton
            className={styles.previous}
            icon="chevronLeft"
            tooltip="Previous image"
            variant="secondary"
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            aria-label="Previous gallery image"
          />

          <div className={styles.stage} onClick={(event) => event.stopPropagation()}>
            <img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              className={styles.lightboxImage}
            />
          </div>

          <IconButton
            className={styles.next}
            icon="chevronRight"
            tooltip="Next image"
            variant="secondary"
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              showNextImage();
            }}
            aria-label="Next gallery image"
          />
        </div>
      )}
    </>
  );
}
