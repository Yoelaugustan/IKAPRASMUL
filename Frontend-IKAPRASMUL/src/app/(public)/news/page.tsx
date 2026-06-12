import type { Metadata } from "next";
import { PageHero } from "@/components/layouts/PageHero";
import { Section } from "@/components/layouts/Section";
import { Container } from "@/components/layouts/Container";
import { NewsValueProps } from "@/components/news/NewsValueProps";
import { FeaturedArticle } from "@/components/news/FeaturedArticle";
import { MostPopularList } from "@/components/news/MostPopularList";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import { StayInformed } from "@/components/news/StayInformed";
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
    getMostPopularArticles(5),
  ]);

  return (
    <>
      <PageHero
        eyebrow="News & Insight"
        title="Insights That Move Forward"
        subtitle="Campus news, alumni achievements, research, and thought leadership — curated for the Prasmul community."
      />

      <Container className="py-12">
        <NewsValueProps />
      </Container>

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            {featured && <FeaturedArticle article={featured} />}
            <div>
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-primary">
                Top Stories
              </h2>
              <NewsExplorer articles={articles} />
            </div>
          </div>
          <aside className="space-y-8">
            <MostPopularList articles={mostPopular} />
            <StayInformed />
          </aside>
        </div>
      </Section>
    </>
  );
}
