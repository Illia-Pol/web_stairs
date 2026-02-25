import { notFound } from "next/navigation";

import { LegacyRedirect } from "@/components/LegacyRedirect";

const legacyBlogMap: Record<string, string> = {
  "armirovanie-betonnoj-lestnicy": "/knowledge",
  "bezopasnost-dlya-detej": "/knowledge",
  "beton-vs-metall": "/knowledge",
  "kak-podgotovit-obekt": "/knowledge/kak-podgotovit-proem",
  "oshibki-pri-zalivke": "/knowledge",
  "otdelka-betonnoj-lestnicy": "/after-finishing",
  "podgotovka-proema-pod-lestnicu": "/knowledge/kak-podgotovit-proem",
  "raschet-betonnoj-lestnicy": "/knowledge/chto-vliyaet-na-stoimost",
  "sroki-izgotovleniya-i-montazha": "/knowledge",
  "ugol-naklona-i-razmery-stupenej": "/knowledge"
};

export function generateStaticParams() {
  return Object.keys(legacyBlogMap).map((slug) => ({ slug }));
}

export default function LegacyBlogSlugPage({ params }: { params: { slug: string } }) {
  const to = legacyBlogMap[params.slug];
  if (!to) notFound();

  return <LegacyRedirect to={to} title="Материал перенесен" />;
}
