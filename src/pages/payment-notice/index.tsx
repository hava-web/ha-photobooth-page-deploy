import React, { useEffect } from 'react';
import { get, split } from 'lodash';
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
import { NoIndexPageSeo } from 'components/seo/PageSeo';

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
      <NoIndexPageSeo
        path="/payment-notice"
        overrides={{
          title: 'Thông báo thanh toán Fun Studio',
          description:
            'Trang thông báo trạng thái thanh toán dành cho khách hàng Fun Studio.',
          ...seoMetaData,
        }}
      />
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
  const orderId = get(query, `${QUERY_STRING.ORDER_ID}`) as string;

  const transactionId = split(orderId, '_')?.[0];

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
