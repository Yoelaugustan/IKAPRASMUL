import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layouts/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import {
  getArticlesPage,
  getFeaturedArticle,
  getMostPopularArticles,
  getTopStories,
} from "@/lib/content";
import { getServerDict } from "@/i18n/server";
import type { Paginated, Article } from "@/types";

export const metadata: Metadata = {
  title: "News & Insight",
  description:
    "Insights that move forward — campus news, alumni news, research, industry trends, and thought leadership from the Prasmul community.",
};

const PAGE_SIZE = 10;
const EMPTY_PAGE: Paginated<Article> = { items: [], total: 0, page: 1, pageSize: PAGE_SIZE, totalPages: 0 };

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; category?: string; search?: string; sort?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const viewAll = sp.view === "all";
  const category = sp.category || undefined;
  const search = sp.search || undefined;
  const sort = sp.sort || undefined;
  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);

  const [{ t }, featured, topStories, mostPopular, pagedArticles] = await Promise.all([
    getServerDict(),
    getFeaturedArticle(),
    getTopStories(),
    getMostPopularArticles(7),
    viewAll
      ? getArticlesPage({ search, category, sort, page, pageSize: PAGE_SIZE })
      : Promise.resolve(EMPTY_PAGE),
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
        <Suspense fallback={<div className="h-96" />}>
          <NewsExplorer
            pagedArticles={pagedArticles}
            featured={featured}
            topStories={topStories}
            mostPopular={mostPopular}
          />
        </Suspense>
      </Reveal>
    </>
  );
}
