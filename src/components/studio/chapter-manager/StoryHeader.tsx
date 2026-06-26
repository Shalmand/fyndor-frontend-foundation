import type { ChapterStoryMeta } from "@/mock/chapterManager";
import { STORY_STATUS_LABEL, formatRelative } from "./shared";

interface Props {
  story: ChapterStoryMeta;
  total: number;
  published: number;
  drafts: number;
}

export function StoryHeader({ story, total, published, drafts }: Props) {
  const stats: Array<{ label: string; value: string }> = [
    { label: "Chapters", value: String(total) },
    { label: "Published", value: String(published) },
    { label: "Drafts", value: String(drafts) },
    { label: "Last edited", value: formatRelative(story.lastEditedAt) },
  ];

  return (
    <section className="flex flex-col gap-6 rounded-3xl bg-surface-1/55 p-6 md:flex-row md:items-center md:p-8">
      <div className="flex items-center gap-5">
        <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-[12px] bg-surface-2 shadow-[var(--shadow-soft)] md:h-28 md:w-[76px]">
          <img
            src={story.coverUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-brand">
            Story Studio · Chapters
          </p>
          <h1 className="mt-2 font-display text-3xl leading-[1.1] tracking-tight text-foreground md:text-[2.25rem]">
            {story.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.78rem] text-muted-foreground">
            <span className="capitalize">{story.type}</span>
            <span aria-hidden>·</span>
            <span>{STORY_STATUS_LABEL[story.status]}</span>
          </div>
        </div>
      </div>

      <div className="md:ml-auto">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-1 font-display text-xl tracking-tight text-foreground/90">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
