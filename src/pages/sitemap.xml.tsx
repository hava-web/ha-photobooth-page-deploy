import type { GetServerSideProps } from 'next';
import { PUBLIC_SEO_ROUTES, buildCanonicalUrl } from 'seo/seo.config';

const SitemapXml = () => null;

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const urls = PUBLIC_SEO_ROUTES.map(
    (route) => `  <url>
    <loc>${escapeXml(buildCanonicalUrl(route.path))}</loc>
  </url>`,
  ).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.write(body);
  res.end();

  return {
    props: {},
  };
};

export default SitemapXml;
