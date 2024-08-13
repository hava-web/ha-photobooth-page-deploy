/* eslint-disable react/jsx-no-useless-fragment */
import React, { Fragment, useEffect, useState } from 'react';
import cx from 'classnames';
// import { NextSeo } from 'next-seo';
// import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { find, get } from 'lodash';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import { downloadFile } from 'api/common.api';
import { useCustomizeUI } from 'hooks/useCustomizeUI';
import { isEqualVal } from 'helpers/string.helper';
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
  appTheme,
  uiTemplateData,
}: DownloadFileProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const { appContainerClass, downloadUI } = appTheme;

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

  const logoImage = uiTemplateData?.logoImageUrl || downloadUI?.logoImage?.src;
  const sloganText =
    uiTemplateData?.sloganTextPageDownload || t('download:funStudioSlogan');
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
      {/* {isDiana && <NextSeo title="Diana cùng cậu" />} */}
      <div
        className={cx(
          'w-screen h-screen flex justify-center download-page-container',
          appContainerClass,
        )}
      >
        <Background />
        <Loader
          loading={loading}
          className="download-page"
          spin={
            logoImage ? (
              <img
                src={logoImage}
                alt="logo loading"
                className="download-logo-loading"
              />
            ) : (
              <></>
            )
          }
        >
          {!!logoImage && (
            <img src={logoImage} alt="logo" className="download-logo" />
          )}
          <Typography
            variant={TYPOGRAPHY_VARIANTS.SMALL}
            className="text-center font-semibold download-title"
          >
            {sloganText}
          </Typography>
          {/* {downloadUI?.sloganImage ? (
            <Image
              src={downloadUI?.sloganImage}
              alt="slogan"
              className="slogan-image"
            />
          ) : (
            <Typography
              variant={TYPOGRAPHY_VARIANTS.SMALL}
              className="text-center font-semibold download-title"
            >
              {uiTemplateData?.sloganTextPageDownload}
            </Typography>
          )} */}
          {!downloadData || !!downloadData?.isExpired ? (
            <Typography
              variant={TYPOGRAPHY_VARIANTS.SMALL}
              className="text-center result-image"
            >
              {downloadData?.isExpired ? expiredText : noDataText}
            </Typography>
          ) : (
            <>
              {videoRecordUrl ? (
                <video
                  className="result-image"
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
                      className="result-image"
                    />
                  ) : (
                    <Typography
                      variant={TYPOGRAPHY_VARIANTS.SMALL}
                      className="text-center result-image"
                    >
                      {uploadingText}
                    </Typography>
                  )}
                </>
              )}
              <div className="download-action">
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
  const appTheme = useCustomizeUI();

  try {
    const uiTemplateResponse = await getUiTemplate({ id: transactionId });
    const downloadResponse = await getDownloadData({ id: transactionId });

    return {
      props: {
        transactionId,
        downloadData: downloadResponse?.data || null,
        appTheme,
        uiTemplateData: uiTemplateResponse?.data || null,
      },
    };
  } catch (err) {
    return {
      props: {
        downloadData: null,
        errorData: JSON.parse(JSON.stringify(err)),
        appTheme,
      },
    };
  }
};
