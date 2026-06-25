import type { Metadata } from "next";
import Link from "next/link";
import { Users2, Building2, BookOpen, Newspaper, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import {
  getAdminArticles,
  getAdminBusinesses,
  getAdminSigGroups,
  getAdminSigSpotlights,
  getAdminStories,
} from "@/lib/adminContent";
import { formatDate } from "@/components/admin/cms/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [groups, spotlights, businesses, stories, articles] = await Promise.all([
    getAdminSigGroups(),
    getAdminSigSpotlights(),
    getAdminBusinesses(),
    getAdminStories(),
    getAdminArticles(),
  ]);

  const stats = [
    {
      label: "SIG Groups",
      value: groups.length,
      sub: `${spotlights.length} spotlight`,
      href: ROUTES.adminSig,
      Icon: Users2,
    },
    {
      label: "Alumni Business",
      value: businesses.length,
      sub: `${businesses.filter((b) => b.isSpotlight).length} spotlight`,
      href: ROUTES.adminBusiness,
      Icon: Building2,
    },
    {
      label: "Alumni Stories",
      value: stories.length,
      sub: `${stories.filter((s) => s.isFeatured).length} featured`,
      href: ROUTES.adminStories,
      Icon: BookOpen,
    },
    {
      label: "News & Insights",
      value: articles.length,
      sub: `${articles.filter((a) => a.isFeatured).length} featured`,
      href: ROUTES.adminNews,
      Icon: Newspaper,
    },
  ];

  const recent = [
    ...stories.map((s) => ({
      title: s.title,
      meta: s.author.name,
      date: s.publishedAt,
      kind: "Story" as const,
    })),
    ...articles.map((a) => ({
      title: a.title,
      meta: a.author.name,
      date: a.publishedAt,
      kind: "News" as const,
    })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const quickActions = [
    { label: "New SIG Group", href: `${ROUTES.adminSig}?new=1` },
    { label: "New business", href: `${ROUTES.adminBusiness}?new=1` },
    { label: "New story", href: `${ROUTES.adminStories}?new=1` },
    { label: "New article", href: `${ROUTES.adminNews}?new=1` },
  ];

  return (
    <div className="mx-auto max-w-[1080px]">
      <h1 className="text-2xl font-bold tracking-tight text-primary">
        Dashboard
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Overview of published content across the public site.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, sub, href, Icon }) => (
          <Link key={label} href={href}>
            <Card className="gap-0 p-5 transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/5 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="text-3xl font-bold text-primary">{value}</span>
              </div>
              <p className="mt-4 text-sm font-semibold text-foreground">
                {label}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card className="gap-0 overflow-hidden p-0 border-0 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
            <h2 className="text-sm font-semibold text-foreground">
              Recently published
            </h2>
            <span className="text-xs text-muted-foreground">
              Latest stories &amp; news
            </span>
          </div>
          {recent.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">
              No published content yet.
            </p>
          ) : (
            recent.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-slate-100 bg-white px-6 py-4 last:border-b-0 hover:bg-slate-50/50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {item.title}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {item.meta} · {formatDate(item.date)}
                  </div>
                </div>
                <Badge variant={item.kind === "Story" ? "secondary" : "outline"}>
                  {item.kind}
                </Badge>
              </div>
            ))
          )}
        </Card>

        <Card className="gap-0 p-5">
          <h2 className="text-sm font-semibold text-foreground">Quick actions</h2>
          <div className="mt-3.5 flex flex-col gap-2.5">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 rounded-lg border px-3 py-3 transition-colors hover:border-gold hover:bg-surface"
              >
                <span className="grid size-7 place-items-center rounded-md bg-gold/15 text-gold-dark">
                  <Plus className="size-4" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
