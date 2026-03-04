import Link from "next/link";

type PageNavCard = {
  href: string;
  title: string;
  text: string;
  cta: string;
};

type PageNavCardsProps = {
  items: PageNavCard[];
  columns?: 2 | 3;
  className?: string;
};

export function PageNavCards({ items, columns = 3, className }: PageNavCardsProps) {
  const columnsClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <nav aria-label="Section navigation" className={["master-side-grid", columnsClass, className].filter(Boolean).join(" ")}>
      {items.map((card) => (
        <Link key={card.href} href={card.href} className="master-link-card">
          <h3>{card.title}</h3>
          <p>{card.text}</p>
          <span>{card.cta}</span>
        </Link>
      ))}
    </nav>
  );
}
