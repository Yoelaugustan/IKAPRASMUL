import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Newspaper, Users2, Building2, Inbox } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import {
  getArticles,
  getBusinesses,
  getSigs,
  getStories,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [sigs, stories, articles, businesses] = await Promise.all([
    getSigs(),
    getStories(),
    getArticles(),
    getBusinesses(),
  ]);

  const stats = [
    { label: "SIGs", value: sigs.length, href: ROUTES.adminSig, Icon: Users2 },
    { label: "Stories", value: stories.length, href: ROUTES.adminStories, Icon: FileText },
    { label: "Articles", value: articles.length, href: ROUTES.adminNews, Icon: Newspaper },
    { label: "Businesses", value: businesses.length, href: ROUTES.adminBusiness, Icon: Building2 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-primary">Dashboard</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Overview of published content. (Counts reflect the current static data.)
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, href, Icon }) => (
          <Link key={label} href={href}>
            <Card className="p-6 transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/5 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="text-3xl font-bold text-primary">{value}</span>
              </div>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                {label}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-8 p-6">
        <div className="flex items-center gap-3">
          <Inbox className="size-5 text-gold" />
          <h2 className="font-semibold text-primary">Recent inquiries</h2>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          The contact inquiries inbox will appear here once the backend is wired.
          For now, submissions from the public &ldquo;Get in Touch&rdquo; modal
          are simulated.
        </p>
        <Link
          href={ROUTES.adminInquiries}
          className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        >
          Go to inquiries →
        </Link>
      </Card>
    </div>
  );
}
