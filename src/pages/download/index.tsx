/* eslint-disable @next/next/no-img-element */
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { find, get } from 'lodash';
import Background from 'components/background/Background';
import Typography from 'components/typography/Typography';
import { TYPOGRAPHY_VARIANTS } from 'components/typography/typography-utils';
import Button from 'components/button/Button';
import { downloadFile } from 'api/common.api';
import { isEqualVal } from 'helpers/string.helper';
import { CONTENT_TYPES } from 'constants/file.const';
import Loader from 'components/loader/Loader';
import { GetServerSideProps } from 'next';
import { QUERY_STRING } from 'constants/route.const';
import { getDownloadData } from 'api/photo/download.api';
import { DownloadDataStateModel } from 'models/download.model';

export default function DownloadFile({
  downloadData,
  errorData,
}: DownloadDataStateModel) {
  const { t } = useTranslation();
  const photoTakenUrl = find(downloadData?.data, (o) =>
    isEqualVal(o?.contentType, CONTENT_TYPES.PNG),
  )?.url;

  const videoRecordUrl = find(downloadData?.data, (o) =>
    isEqualVal(o?.contentType, CONTENT_TYPES.MP4),
  )?.url;

  const handleDownloadImage = () => {
    downloadFile(photoTakenUrl);
  };
  const handleDownloadVideo = () => {
    downloadFile(videoRecordUrl);
  };

  console.log('>>> errorData', errorData);

  return (
    <div className="no-drag select-none w-screen h-screen flex justify-center app-content">
      <Background />
      <Loader loading={false} className="download-page">
        <img
          src="/images/fun_studio_logo.png"
          alt="logo"
          className="download-logo"
        />
        <Typography
          variant={TYPOGRAPHY_VARIANTS.SMALL}
          className="text-center font-semibold download-title"
        >
          {t('download:bringLoveToYourLife')}
        </Typography>
        {photoTakenUrl ? (
          <img src={photoTakenUrl} alt="result" className="result-image" />
        ) : (
          <Typography
            variant={TYPOGRAPHY_VARIANTS.SMALL}
            className="text-center result-image"
          >
            {t('download:dataIsUploading')}
          </Typography>
        )}
        <div className="download-action">
          <Button
            color="default"
            onClick={handleDownloadImage}
            disabled={!photoTakenUrl}
          >
            {t('common:downloadImage')}
          </Button>
          <Button onClick={handleDownloadVideo} disabled={!photoTakenUrl}>
            {t('common:downloadVideo')}
          </Button>
        </div>
        <Typography
          variant={TYPOGRAPHY_VARIANTS.SMALL}
          className="text-center font-bold"
        >
          {t('download:linkExpireInFiveDays')}
        </Typography>
      </Loader>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const transactionId = get(query, `${QUERY_STRING.TRANSACTION}`);

  try {
    const downloadResponse = await getDownloadData({
      id: transactionId as string,
    });
    return {
      props: { downloadData: downloadResponse },
    };
  } catch (err) {
    return {
      props: { downloadData: null, errorData: err },
    };
  }

  return {
    props: { downloadData: null },
  };
};
