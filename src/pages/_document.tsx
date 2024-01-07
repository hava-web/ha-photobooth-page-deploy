import React from 'react';
import { NextPageContext } from 'next';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

export const i18nPropsFromCtx = (ctx: NextPageContext): Object => {
  if (!(ctx && ctx.req && (ctx.req as any).language)) return {};
  const req = ctx.req as any;
  return {
    lang: req.language,
    dir: req.i18n && req.i18n.dir(req.language),
  };
};

export default class MyDocument extends Document<{
  i18nDocumentProps: Object;
}> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);
    const i18nDocumentProps = i18nPropsFromCtx(ctx);

    return {
      ...initialProps,
      i18nDocumentProps,
    };
  }

  render() {
    return (
      <Html className="notranslate" translate="no" lang="vi">
        <Head>
          <meta charSet="utf-8" />
          <meta name="google" content="notranslate" />
          <meta name="theme-color" content="#000000" />
          <meta content="vi-VN" itemProp="inLanguage" />
          <meta
            name="description"
            content="Studio tự chụp ảnh phong cách Hàn Quốc"
          />
          <meta
            name="keywords"
            content="fun studio, funstudio, photobooth, korean style, fyp"
          />
          <meta name="build-version" content="v0.0.1" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/fun_studio_logo.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
