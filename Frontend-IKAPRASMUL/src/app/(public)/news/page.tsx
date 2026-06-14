import type { Metadata } from "next";
import { PageHero } from "@/components/layouts/PageHero";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import {
  getArticles,
  getFeaturedArticle,
  getMostPopularArticles,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "News & Insight",
  description:
    "Insights that move forward — campus news, alumni news, research, industry trends, and thought leadership from the Prasmul community.",
};

export default async function NewsPage() {
  const [articles, featured, mostPopular] = await Promise.all([
    getArticles(),
    getFeaturedArticle(),
    getMostPopularArticles(7),
  ]);

  return (
    <>
      <PageHero
        eyebrow="News & Insights"
        title={
          <>
            Insights That
            <br />
            <span className="text-gold">Move Forward</span>
          </>
        }
        subtitle="Stay informed with the latest news, research, and thought leadership from Prasetiya Mulya and our global alumni community."
        backgroundImage="/images/news/hero-news.jpg"
        overlap
      />

      <NewsExplorer
        articles={articles}
        featured={featured}
        mostPopular={mostPopular}
      />
    </>
  );
}
