/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { get, size } from 'lodash';
import { GetServerSideProps } from 'next';
import { getUiTemplate } from 'api/ui-template/ui-template.api';
import Background from 'components/background/Background';
import Typography from 'components/typography/Typography';
import { TYPOGRAPHY_VARIANTS } from 'components/typography/typography-utils';
import { useTranslation } from 'hooks/useTranslation';
import { QUERY_STRING } from 'constants/route.const';
import { handleUpdateCSSVar } from 'helpers/dom.helper';
import funLogoImage from 'assets/images/fun_studio_logo.png';
import { DownloadDataStateModel } from 'models/download.model';
import { UiTemplateModel } from 'models/ui-template/ui-template.model';
import { jsonParse } from 'helpers/string.helper';

type PaymentNoticeProps = DownloadDataStateModel & {
  uiTemplateData: UiTemplateModel;
};

export default function PaymentNoticeFile({
  uiTemplateData,
}: PaymentNoticeProps) {
  const { t } = useTranslation();

  const logoImage = uiTemplateData?.logoImageUrl || funLogoImage?.src;
  const seoMetaData = jsonParse(
    uiTemplateData?.seoMetaDataJsonPageDownload || '',
    {},
  );
  const sloganText =
    uiTemplateData?.sloganTextPageDownload || t('download:funStudioSlogan');
  const paymentSuccessText =
    uiTemplateData?.paymentSuccessTextPageDownload ||
    t('common:paymentSuccess');

  useEffect(() => {
    if (uiTemplateData?.backgroundPageDownload) {
      handleUpdateCSSVar(uiTemplateData);
    }
  }, [uiTemplateData]);

  return (
    <>
      {!!size(seoMetaData) && <NextSeo {...seoMetaData} />}
      <div className="page-single__layout">
        <Background />
        <div className="page-single__grid">
          {!!logoImage && (
            <img src={logoImage} alt="logo" className="page-single__logo" />
          )}
          <Typography
            variant={TYPOGRAPHY_VARIANTS.SMALL}
            className="page-single__content-text page-single__slogan-text"
          >
            {sloganText}
          </Typography>
          <Typography
            variant={TYPOGRAPHY_VARIANTS.SMALL}
            className="page-single__content-text"
          >
            {paymentSuccessText}
          </Typography>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const transactionId = get(query, `${QUERY_STRING.TRANSACTION}`) as string;

  try {
    const uiTemplateResponse = await getUiTemplate({ id: transactionId });

    return {
      props: {
        transactionId,
        uiTemplateData: uiTemplateResponse?.data || null,
      },
    };
  } catch (err) {
    return {
      props: {
        downloadData: null,
        errorData: JSON.parse(JSON.stringify(err)),
      },
    };
  }
};
