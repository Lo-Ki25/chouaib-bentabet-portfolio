"use client";

import { useLanguage } from "@/context/LanguageContext";
import Chapter from "./ui/Chapter";

export default function DigitalTransformation() {
  const { dict } = useLanguage();
  const copy = dict.chapters.transformation;

  return (
    <Chapter
      id="transformation"
      backgroundSrc="/images/og-cover-bonus.png"
      eyebrow={copy.eyebrow}
      title={copy.title}
      body={copy.body}
      pills={copy.pills}
    />
  );
}
