import Link from "next/link";

type PageCrumb = {
  label: string;
  href?: string;
};

type PageTopProps = {
  breadcrumbs: PageCrumb[];
  kicker?: string;
  title: string;
  description?: string;
  story?: string[];
};

export function PageTop({ breadcrumbs, kicker, title, description, story = [] }: PageTopProps) {
  return (
    <>
      <nav aria-label="Breadcrumbs" className="portfolio-breadcrumbs text-sm text-ink-soft">
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                {index > 0 ? <span>/</span> : null}
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-ink">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-ink" : ""}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="portfolio-page-head">
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>

      {story.length ? (
        <div className="portfolio-story">
          {story.map((text, index) => (
            <p key={`${index}-${text.slice(0, 18)}`}>{text}</p>
          ))}
        </div>
      ) : null}
    </>
  );
}
