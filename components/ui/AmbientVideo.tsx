"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useInViewport } from "@/hooks/useInViewport";
import { useTabVisible } from "@/hooks/useTabVisible";
import { cn } from "@/lib/utils";

type AmbientVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * Vidéo de fond discrète : ne charge/joue que quand l'élément est visible à
 * l'écran, l'onglet est actif, et prefers-reduced-motion est désactivé.
 * Toujours muted + playsInline. Tant que ces conditions ne sont pas réunies
 * (ou que le fichier n'existe pas encore), seul le poster est affiché — via
 * un <img> simple plutôt que next/image, pour éviter le mismatch
 * d'hydratation déjà rencontré ailleurs sur ce projet avec next/image+fill
 * sur des visuels purement décoratifs.
 */
export default function AmbientVideo({ src, poster, className }: AmbientVideoProps) {
  const prefersReducedMotion = useReducedMotion();
  const tabVisible = useTabVisible();
  const { ref, inView } = useInViewport<HTMLDivElement>({ once: false, threshold: 0.1 });
  const videoRef = useRef<HTMLVideoElement>(null);

  const shouldPlay = inView && tabVisible && !prefersReducedMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      video.play().catch(() => {
        /* autoplay refusé par le navigateur : le poster reste affiché, pas grave */
      });
    } else {
      video.pause();
    }
  }, [shouldPlay]);

  return (
    <div ref={ref} className={cn("pointer-events-none overflow-hidden", className)} aria-hidden>
      {inView && !prefersReducedMotion ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          className="h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="h-full w-full object-cover" />
      )}
    </div>
  );
}
