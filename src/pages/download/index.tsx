/* eslint-disable react/jsx-no-useless-fragment */
import { downloadFile } from 'api/common.api';
import { getDownloadData } from 'api/photo/download.api';
import { getUiTemplate } from 'api/ui-template/ui-template.api';
import funLogoImage from 'assets/images/fun_studio_logo.png';
import cx from 'classnames';
import Background from 'components/background/Background';
import Button from 'components/button/Button';
import Loader from 'components/loader/Loader';
import Typography from 'components/typography/Typography';
import { TYPOGRAPHY_VARIANTS } from 'components/typography/typography-utils';
import {
  CONTENT_TYPES,
  FILE_GIF_DOWNLOAD,
  FILE_IMAGE_DOWNLOAD,
  FILE_VIDEO_DOWNLOAD,
} from 'constants/file.const';
import { QUERY_STRING } from 'constants/route.const';
import { DATE_FORMAT, HOUR_MINUTE_FORMAT } from 'constants/time.const';
import { handleUpdateCSSVar } from 'helpers/dom.helper';
import { isEqualVal, jsonParse } from 'helpers/string.helper';
import { useTranslation } from 'hooks/useTranslation';
import { find, get, size } from 'lodash';
import { DownloadDataStateModel } from 'models/download.model';
import { UiTemplateModel } from 'models/ui-template/ui-template.model';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';
import EncycomEmbed from 'containers/encycom/EncycomEmbed';
import FloatingEarnPointButtons from './FloatingEarnPointButtons';

type DownloadFileProps = DownloadDataStateModel & {
  uiTemplateData: UiTemplateModel;
};

export default function DownloadFile({
  transactionId,
  downloadData,
  errorData,
  uiTemplateData,
}: DownloadFileProps) {
  const { t, T } = useTranslation();
  const [loading, setLoading] = useState(false);

  console.log('ttt downloadData', downloadData, errorData);
  console.log('ttt uiTemplateData', uiTemplateData);

  const photoTakenUrl = find(downloadData?.resources, (o) =>
    isEqualVal(o?.contentType, CONTENT_TYPES.PNG),
  )?.url;

  const videoRecordUrl = find(downloadData?.resources, (o) =>
    isEqualVal(o?.contentType, CONTENT_TYPES.MP4),
  )?.url;

  const gifTakenUrl = find(downloadData?.resources, (o) =>
    isEqualVal(o?.contentType, CONTENT_TYPES.GIF),
  )?.url;

  const handleDownloadImage = async () => {
    setLoading(true);
    await downloadFile(
      photoTakenUrl,
      `${FILE_IMAGE_DOWNLOAD}-${moment().unix()}`,
    );
    setLoading(false);
  };
  const handleDownloadVideo = async () => {
    setLoading(true);
    await downloadFile(
      videoRecordUrl,
      `${FILE_VIDEO_DOWNLOAD}-${moment().unix()}`,
    );
    setLoading(false);
  };
  const handleDownloadGif = async () => {
    setLoading(true);
    await downloadFile(gifTakenUrl, `${FILE_GIF_DOWNLOAD}-${moment().unix()}`);
    setLoading(false);
  };

  const logoImage = uiTemplateData?.logoImageUrl || funLogoImage?.src;
  const seoMetaData = jsonParse(
    uiTemplateData?.seoMetaDataJsonPageDownload || '',
    {},
  );
  const sloganText =
    uiTemplateData?.sloganTextPageDownload || T('download:funStudioSlogan');
  const expiredText =
    uiTemplateData?.expiredTextPageDownload || t('download:dataExpired');
  const noDataText =
    uiTemplateData?.noDataTextPageDownload || t('download:noData');
  const uploadingText =
    uiTemplateData?.uploadingTextPageDownload || t('download:dataIsUploading');

  useEffect(() => {
    if (uiTemplateData?.backgroundPageDownload) {
      handleUpdateCSSVar(uiTemplateData);
    }
  }, [uiTemplateData]);

  return (
    <>
      {!!size(seoMetaData) && <NextSeo {...seoMetaData} />}
      <div className={cx('page-single__layout')}>
        <EncycomEmbed />
        <Background />
        <Loader
          loading={loading}
          className="page-single__grid"
          spin={
            logoImage ? (
              <img
                src={logoImage}
                alt="logo loading"
                className="page-single__logo-loading"
              />
            ) : (
              <></>
            )
          }
        >
          {!!logoImage && (
            <img src={logoImage} alt="logo" className="page-single__logo" />
          )}
          <Typography
            variant={TYPOGRAPHY_VARIANTS.SMALL}
            className="page-single__content-text page-single__slogan-text"
          >
            {sloganText}
          </Typography>
          {!!downloadData && uiTemplateData?.isAllowEarnPoint && (
            <FloatingEarnPointButtons transactionId={transactionId} />
          )}
          {!downloadData || !!downloadData?.isExpired ? (
            <Typography
              variant={TYPOGRAPHY_VARIANTS.SMALL}
              className="page-single__download-result-image"
            >
              {downloadData?.isExpired ? expiredText : noDataText}
            </Typography>
          ) : (
            <>
              {videoRecordUrl ? (
                <video
                  className="page-single__download-result-image"
                  poster={photoTakenUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <track kind="captions" />
                  <source src={videoRecordUrl} type="video/mp4" />
                </video>
              ) : (
                <>
                  {photoTakenUrl ? (
                    <img
                      src={photoTakenUrl}
                      alt="result"
                      className="page-single__download-result-image"
                    />
                  ) : (
                    <Typography
                      variant={TYPOGRAPHY_VARIANTS.SMALL}
                      className="page-single__download-result-image"
                    >
                      {uploadingText}
                    </Typography>
                  )}
                </>
              )}
              <div className="page-single__download-actions">
                <Button
                  color="default"
                  onClick={handleDownloadImage}
                  disabled={!photoTakenUrl || loading}
                >
                  {t('common:downloadImage')}
                </Button>
                {!!downloadData?.hasVideo && videoRecordUrl && (
                  <Button
                    onClick={handleDownloadVideo}
                    disabled={!videoRecordUrl || loading}
                  >
                    {t('common:downloadVideo')}
                  </Button>
                )}
                {gifTakenUrl && (
                  <Button
                    onClick={handleDownloadGif}
                    disabled={!gifTakenUrl || loading}
                  >
                    {t('common:downloadGif')}
                  </Button>
                )}
              </div>
              <Typography
                variant={TYPOGRAPHY_VARIANTS.SMALL}
                className="text-center machine-info-text"
              >
                {`${
                  moment(downloadData?.recordAt).format(HOUR_MINUTE_FORMAT) ||
                  '_'
                } ngày ${
                  moment(downloadData?.recordAt).format(DATE_FORMAT) || '_'
                }, máy ${downloadData?.device}`}
              </Typography>
              <Typography
                variant={TYPOGRAPHY_VARIANTS.SMALL}
                className="text-center font-bold"
              >
                {t('download:linkExpireInFiveDays')}
              </Typography>
            </>
          )}
        </Loader>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const transactionId = get(query, `${QUERY_STRING.TRANSACTION}`) as string;

  try {
    const uiTemplateResponse = await getUiTemplate({ id: transactionId });
    const downloadResponse = await getDownloadData({ id: transactionId });

    return {
      props: {
        transactionId,
        downloadData: downloadResponse?.data || null,
        uiTemplateData: uiTemplateResponse?.data || null,
      },
    };
  } catch (err) {
    return {
      props: {
        transactionId,
        downloadData: null,
        errorData: JSON.parse(JSON.stringify(err)),
      },
    };
  }
};
