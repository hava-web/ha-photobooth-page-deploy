/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { NextSeo } from 'next-seo';
import { find, get, size } from 'lodash';
import moment from 'moment';
import { useTranslation } from 'hooks/useTranslation';
import { GetServerSideProps } from 'next';
import { downloadFile } from 'api/common.api';
import { isEqualVal, jsonParse } from 'helpers/string.helper';
import {
  CONTENT_TYPES,
  FILE_IMAGE_DOWNLOAD,
  FILE_VIDEO_DOWNLOAD,
} from 'constants/file.const';
import { TYPOGRAPHY_VARIANTS } from 'components/typography/typography-utils';
import Background from 'components/background/Background';
import Typography from 'components/typography/Typography';
import Button from 'components/button/Button';
import Loader from 'components/loader/Loader';
import funLogoImage from 'assets/images/fun_studio_logo.png';
import { QUERY_STRING } from 'constants/route.const';
import { getDownloadData } from 'api/photo/download.api';
import { DownloadDataStateModel } from 'models/download.model';
import { DATE_FORMAT, HOUR_MINUTE_FORMAT } from 'constants/time.const';
import { getUiTemplate } from 'api/ui-template/ui-template.api';
import { UiTemplateModel } from 'models/ui-template/ui-template.model';
import { handleUpdateCSSVar } from 'helpers/dom.helper';

type DownloadFileProps = DownloadDataStateModel & {
  uiTemplateData: UiTemplateModel;
};

export default function DownloadFile({
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
        downloadData: null,
        errorData: JSON.parse(JSON.stringify(err)),
      },
    };
  }
};
