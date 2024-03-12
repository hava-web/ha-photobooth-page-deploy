/* eslint-disable react/jsx-no-useless-fragment */
import React, { Fragment, useState } from 'react';
import cx from 'classnames';
import Image from 'next/image';
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

export default function DownloadFile({
  downloadData,
  errorData,
  appTheme,
}: DownloadDataStateModel) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const { appContainerClass, downloadUI } = appTheme;

  console.log('ttt downloadData', downloadData, errorData);

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

  return (
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
          downloadUI?.logoImage ? (
            <Image
              src={downloadUI?.logoImage}
              alt="logo loading"
              className="download-logo-loading"
            />
          ) : (
            <></>
          )
        }
      >
        {!!downloadUI?.logoImage && (
          <Image
            src={downloadUI?.logoImage}
            alt="logo"
            className="download-logo"
          />
        )}
        {downloadUI?.sloganImage ? (
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
            {t('download:funStudioSlogan')}
          </Typography>
        )}
        {!downloadData || !!downloadData?.isExpired ? (
          <Typography
            variant={TYPOGRAPHY_VARIANTS.SMALL}
            className="text-center result-image"
          >
            {downloadData?.isExpired
              ? t('download:dataExpired')
              : t('download:noData')}
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
                    {t('download:dataIsUploading')}
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
                moment(downloadData?.recordAt).format(HOUR_MINUTE_FORMAT) || '_'
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
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const transactionId = get(query, `${QUERY_STRING.TRANSACTION}`);
  const appTheme = useCustomizeUI();

  try {
    const downloadResponse = await getDownloadData({
      id: transactionId as string,
    });
    return {
      props: { downloadData: downloadResponse?.data, appTheme },
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
