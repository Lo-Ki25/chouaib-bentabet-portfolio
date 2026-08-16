"use client";

import { useLanguage } from "@/context/LanguageContext";
import Chapter from "./ui/Chapter";

export default function MarketAndDesign() {
  const { dict } = useLanguage();
  const copy = dict.chapters.marketDesign;

  return (
    <Chapter
      id="market-design"
      backgroundSrc="/images/chapters/market-design-backdrop.png"
      eyebrow={copy.eyebrow}
      title={copy.title}
      body={copy.body}
      pills={copy.pills}
    />
  );
}
