import type { Metadata } from "next";
import { PageHero } from "@/components/layouts/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import {
  getArticles,
  getFeaturedArticle,
  getMostPopularArticles,
  getTopStories,
} from "@/lib/content";
import { getServerDict } from "@/i18n/server";

export const metadata: Metadata = {
  title: "News & Insight",
  description:
    "Insights that move forward — campus news, alumni news, research, industry trends, and thought leadership from the Prasmul community.",
};

export default async function NewsPage() {
  const [{ t }, articles, featured, topStories, mostPopular] = await Promise.all([
    getServerDict(),
    getArticles(),
    getFeaturedArticle(),
    getTopStories(),
    getMostPopularArticles(7),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t.pageHero.newsEyebrow}
        title={
          <>
            {t.pageHero.newsTitle1}
            <br />
            <span className="text-gold">{t.pageHero.newsTitle2}</span>
          </>
        }
        subtitle={t.pageHero.newsSubtitle}
        backgroundImage="/images/news/hero-news.jpg"
        overlap
      />

      <Reveal>
        <NewsExplorer
          articles={articles}
          featured={featured}
          topStories={topStories}
          mostPopular={mostPopular}
        />
      </Reveal>
    </>
  );
}
