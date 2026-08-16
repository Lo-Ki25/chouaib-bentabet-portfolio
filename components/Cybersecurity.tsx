"use client";

import { useLanguage } from "@/context/LanguageContext";
import Chapter from "./ui/Chapter";

export default function Cybersecurity() {
  const { dict } = useLanguage();
  const copy = dict.chapters.cybersecurity;

  return (
    <Chapter
      id="cybersecurity"
      backgroundSrc="/images/chapters/cybersecurity-backdrop.png"
      eyebrow={copy.eyebrow}
      title={copy.title}
      body={copy.body}
      pills={copy.pills}
    />
  );
}
