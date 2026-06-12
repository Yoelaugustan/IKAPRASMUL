import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ROUTES } from "@/constants/routes";

export function StoryCard({ story }: { story: Story }) {
  return (
    <Card className="group h-full overflow-hidden p-0">
      <Link href={ROUTES.story(story.slug)} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute left-3 top-3 bg-surface text-primary hover:bg-surface">
            {story.category}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold text-primary group-hover:underline">
            {story.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-foreground/80">
            {story.excerpt}
          </p>
          <div className="mt-auto flex items-center gap-3 pt-5">
            <Avatar className="size-9">
              <AvatarImage src={story.author.avatar} alt={story.author.name} />
              <AvatarFallback>{story.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <p className="font-medium text-foreground">{story.author.name}</p>
              <p className="text-muted-foreground">
                {story.author.class} · {story.readMinutes} min read
              </p>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
