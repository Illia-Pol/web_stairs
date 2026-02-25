/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/betonnye-lestnitsy-minsk', destination: '/geo/minsk', permanent: true },
      { source: '/betonnye-lestnitsy-brest', destination: '/geo/brest', permanent: true },
      { source: '/betonnye-lestnitsy-grodno', destination: '/geo/grodno', permanent: true },
      { source: '/betonnye-lestnitsy-gomel', destination: '/geo/gomel', permanent: true },
      { source: '/betonnye-lestnitsy-mogilev', destination: '/geo/mogilev', permanent: true },
      { source: '/betonnye-lestnitsy-vitebsk', destination: '/geo/vitebsk', permanent: true },
      { source: '/betonnye-lestnitsy-minsk/:path*', destination: '/geo/minsk', permanent: true },
      { source: '/betonnye-lestnitsy-brest/:path*', destination: '/geo/brest', permanent: true },
      { source: '/betonnye-lestnitsy-grodno/:path*', destination: '/geo/grodno', permanent: true },
      { source: '/betonnye-lestnitsy-gomel/:path*', destination: '/geo/gomel', permanent: true },
      { source: '/betonnye-lestnitsy-mogilev/:path*', destination: '/geo/mogilev', permanent: true },
      { source: '/betonnye-lestnitsy-vitebsk/:path*', destination: '/geo/vitebsk', permanent: true },
      { source: '/betonnye-lestnitsy', destination: '/types', permanent: true },
      { source: '/betonnye-lestnitsy/:path*', destination: '/types', permanent: true },
      { source: '/monolitnye-lestnitsy', destination: '/types/monolitnaya-lestnitsa', permanent: true },
      { source: '/konsolnye-lestnitsy', destination: '/types/konsolnaya-lestnitsa', permanent: true },
      { source: '/paryashchie-lestnitsy', destination: '/types/paryashchaya-lestnitsa', permanent: true },
      { source: '/lestnitsa-v-chastnyj-dom', destination: '/features/chastnyj-dom', permanent: true },
      { source: '/cena-betonnoj-lestnicy', destination: '/prices', permanent: true },
      { source: '/kontakty', destination: '/contacts', permanent: true },
      { source: '/o-nas', destination: '/about', permanent: true },
      { source: '/blog/kak-podgotovit-obekt', destination: '/knowledge/kak-podgotovit-proem', permanent: true },
      { source: '/blog/raschet-betonnoj-lestnicy', destination: '/knowledge/chto-vliyaet-na-stoimost', permanent: true },
      { source: '/blog/otdelka-betonnoj-lestnicy', destination: '/after-finishing', permanent: true },
      { source: '/blog', destination: '/knowledge', permanent: true },
      { source: '/blog/:slug*', destination: '/knowledge', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/betonnye-lestnitsy/index.html', destination: '/types', permanent: true },
      { source: '/monolitnye-lestnitsy/index.html', destination: '/types/monolitnaya-lestnitsa', permanent: true },
      { source: '/konsolnye-lestnitsy/index.html', destination: '/types/konsolnaya-lestnitsa', permanent: true },
      { source: '/paryashchie-lestnitsy/index.html', destination: '/types/paryashchaya-lestnitsa', permanent: true },
      { source: '/cena-betonnoj-lestnicy/index.html', destination: '/prices', permanent: true },
      { source: '/kontakty/index.html', destination: '/contacts', permanent: true },
      { source: '/o-nas/index.html', destination: '/about', permanent: true },
      { source: '/blog/index.html', destination: '/knowledge', permanent: true }
    ];
  }
};

export default nextConfig;
