import type { GetServerSideProps } from 'next';
import { getSiteUrl } from 'seo/seo.config';

const RobotsTxt = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${getSiteUrl()}/sitemap.xml`,
    '',
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.write(body);
  res.end();

  return {
    props: {},
  };
};

export default RobotsTxt;
