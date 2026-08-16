"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/data";
import { useFinePointer } from "@/hooks/useFinePointer";
import { useTabVisible } from "@/hooks/useTabVisible";
import { cn } from "@/lib/utils";
import AmbientVideo from "./ui/AmbientVideo";
import Eyebrow from "./ui/Eyebrow";
import KineticHeadline from "./ui/KineticHeadline";
import PillButton from "./ui/PillButton";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

export default function Hero() {
  const { dict } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const tabVisible = useTabVisible();
  const [mounted, setMounted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const parallaxX = useSpring(rawX, { stiffness: 40, damping: 20, mass: 0.6 });
  const parallaxY = useSpring(rawY, { stiffness: 40, damping: 20, mass: 0.6 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const canAnimate = mounted && !prefersReducedMotion;
  const canLoop = canAnimate && tabVisible;
  const show3D = canAnimate && finePointer;

  const fadeUp = (delay = 0) =>
    canAnimate
      ? {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay },
        }
      : {};

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!finePointer || prefersReducedMotion) return;
    rawX.set((e.clientX / window.innerWidth - 0.5) * 24);
    rawY.set((e.clientY / window.innerHeight - 0.5) * 16);
  };

  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      className="relative min-h-[100dvh] overflow-x-hidden overflow-y-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={finePointer && !prefersReducedMotion ? { x: parallaxX, y: parallaxY } : undefined}
        >
          {mounted ? (
            <Image
              src="/images/hero-network.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className={cn(
                "object-cover object-center transition-opacity duration-700",
                sceneReady ? "opacity-[0.16] sm:opacity-[0.2]" : "opacity-[0.38] sm:opacity-[0.44]",
              )}
            />
          ) : null}
          {show3D ? (
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: sceneReady ? 1 : 0 }}
            >
              <HeroScene paused={!canLoop} onReady={() => setSceneReady(true)} />
            </div>
          ) : null}
        </motion.div>

        <AmbientVideo
          src="/videos/hero-ambient.mp4"
          poster="/images/hero-network.png"
          className="absolute inset-0 opacity-[0.08] mix-blend-screen"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/35 to-base-900/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-base-900/75 via-base-900/10 to-accent-500/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-base-900/40 via-transparent to-base-900" />

        <div className="absolute -left-24 -top-32 h-[220px] w-[220px] rounded-full bg-accent-500/20 blur-[80px] animate-blob motion-reduce:animate-none sm:h-[420px] sm:w-[420px] sm:bg-accent-500/25 sm:blur-[120px]" />
        <div
          className="absolute -right-32 top-1/4 h-[180px] w-[180px] rounded-full bg-violet/15 blur-[80px] animate-blob motion-reduce:animate-none sm:h-[380px] sm:w-[380px] sm:bg-violet/20 sm:blur-[120px]"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <KineticHeadline
        text={dict.hero.title1}
        backdrop="scene3d"
        className="items-center justify-center pb-32 sm:pb-40"
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-between px-page pb-16 pt-28 sm:pb-20 sm:pt-32 md:pb-24 md:pt-36">
        <div>
          <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <Eyebrow>{dict.hero.eyebrow}</Eyebrow>
            <span className="inline-flex items-center gap-2 text-[11px] font-medium text-cta sm:text-xs">
              <span className="h-2 w-2 shrink-0 rounded-full bg-cta animate-pulse-glow motion-reduce:animate-none" />
              <span className="truncate">{dict.hero.available}</span>
            </span>
          </motion.div>
          <h1 className="sr-only">
            {profile.name} — {dict.hero.title1}
          </h1>
        </div>

        <div className="relative max-w-2xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-4 -inset-y-6 bg-gradient-to-t from-base-900 via-base-900/80 to-transparent sm:-inset-x-6"
          />
          <motion.p
            {...fadeUp(0.2)}
            className="relative text-[15px] leading-relaxed text-muted sm:text-lg"
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.div
            {...fadeUp(0.35)}
            className="relative mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <PillButton href="#projects" variant="solid" icon={ArrowDown} className="w-full sm:w-auto">
              {dict.hero.ctaPrimary}
            </PillButton>
            <PillButton href="#contact" variant="outline" icon={Mail} className="w-full sm:w-auto">
              {dict.hero.ctaSecondary}
            </PillButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
