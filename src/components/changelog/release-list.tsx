import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChangelogRelease, formatReleaseDate } from "@/lib/changelog";

export function ReleaseList({
  releases,
}: {
  releases: readonly ChangelogRelease[];
}) {
  return (
    <ol className="space-y-4">
      {releases.map((release) => (
        <li key={release.version}>
          <Card>
            <CardHeader className="gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="font-mono text-lg tracking-tight">
                  v{release.version}
                </CardTitle>
                {release.latest ? <Badge>Latest</Badge> : null}
              </div>
              {release.date ? (
                <CardDescription>
                  <time dateTime={release.date}>
                    {formatReleaseDate(release.date)}
                  </time>
                </CardDescription>
              ) : null}
            </CardHeader>
            <CardContent className="space-y-5">
              {release.sections.map((section) => (
                <section key={section.title} className="space-y-2">
                  <h2 className="text-xs font-semibold tracking-wide text-primary uppercase">
                    {section.title}
                  </h2>
                  <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    {section.items.map((item, index) => (
                      <li key={`${section.title}-${index}`}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </CardContent>
          </Card>
        </li>
      ))}
    </ol>
  );
}
