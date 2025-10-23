/* eslint-disable react/jsx-no-useless-fragment */
import { downloadFiles, shareLink } from 'api/common.api';
import { getDownloadData } from 'api/photo/download.api';
import { getUiTemplate } from 'api/ui-template/ui-template.api';
import funLogoImage from 'assets/images/fun_studio_logo.png';
import cx from 'classnames';
import Background from 'components/background/Background';
import Button from 'components/button/Button';
import Loader from 'components/loader/Loader';
import Typography from 'components/typography/Typography';
import { TYPOGRAPHY_VARIANTS } from 'components/typography/typography-utils';
import { CONTENT_TYPES, FILE_IMAGE_DOWNLOAD } from 'constants/file.const';
import { QUERY_STRING } from 'constants/route.const';
import { DATE_FORMAT, HOUR_MINUTE_FORMAT } from 'constants/time.const';
import { handleUpdateCSSVar } from 'helpers/dom.helper';
import { isEqualVal, jsonParse } from 'helpers/string.helper';
import { useTranslation } from 'hooks/useTranslation';
import { find, get, includes, isEmpty, map, size } from 'lodash';
import { DownloadDataStateModel } from 'models/download.model';
import { UiTemplateModel } from 'models/ui-template/ui-template.model';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import Image from 'components/image/Image';
import leftArrowIcon from 'assets/icons/left_arrow.png';
import rightArrowIcon from 'assets/icons/right_arrow.png';
import { AssetIcons } from 'assets/icons/AssetIcons';
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
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [resource, setResource] = useState<string[]>([]);

  console.log('ttt downloadData', downloadData, errorData);
  console.log('ttt uiTemplateData', uiTemplateData);

  const photoTakenUrl = find(downloadData?.resources, (o) =>
    isEqualVal(o?.contentType, CONTENT_TYPES.PNG),
  )?.url;

  const handleDownload = async () => {
    setLoading(true);
    await downloadFiles(resource, `${FILE_IMAGE_DOWNLOAD}-${moment().unix()}`);
    setResource([]);
    setLoading(false);
  };

  const handleShare = async () => {
    setLoading(true);
    await shareLink(window.location.href);
    setLoading(false);
  };

  const handleAddResource = (url: string) => {
    setResource((item) =>
      item.includes(url) ? item.filter((i) => i !== url) : [...item, url],
    );
  };

  const handleNewsPrev = () => {
    // eslint-disable-next-line no-unused-expressions
    swiper && swiper.slidePrev();
  };

  const handleNewsNext = () => {
    // eslint-disable-next-line no-unused-expressions
    swiper && swiper.slideNext();
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
              <div className="flex max-h-[60rem] mb-[4rem]">
                <button
                  type="button"
                  className="pb-carousel-arrow pb-carousel-arrow-left"
                  onClick={handleNewsPrev}
                >
                  <Image
                    src={leftArrowIcon}
                    width={25}
                    height={25}
                    alt="left arrow"
                  />
                </button>
                <Swiper onSwiper={setSwiper} loop>
                  {downloadData ? (
                    map(downloadData?.resources, (item, index) => (
                      <SwiperSlide
                        className={`swiper-slide`}
                        key={`${index}`}
                        onClick={() => handleAddResource(item.url)}
                      >
                        {isEqualVal(item?.contentType, CONTENT_TYPES.MP4) ? (
                          <>
                            <div
                              className={`resource-container ${includes(resource, item?.url) && 'selected'}`}
                            >
                              {includes(resource, item?.url) && (
                                <AssetIcons.CheckIcon className="check-icon" />
                              )}
                              <video
                                className={`page-single__download-result-image`}
                                poster={photoTakenUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                              >
                                <track kind="captions" />
                                <source src={item.url} type="video/mp4" />
                              </video>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className={`resource-container ${includes(resource, item?.url) && 'selected'}`}
                            >
                              {includes(resource, item?.url) && (
                                <AssetIcons.CheckIcon className="check-icon" />
                              )}
                              <img
                                src={item.url}
                                key={index}
                                alt="result"
                                className={`page-single__download-result-image`}
                              />
                            </div>
                          </>
                        )}
                      </SwiperSlide>
                    ))
                  ) : (
                    <Typography
                      variant={TYPOGRAPHY_VARIANTS.SMALL}
                      className="page-single__download-result-image"
                    >
                      {uploadingText}
                    </Typography>
                  )}
                </Swiper>
                <button
                  type="button"
                  className="pb-carousel-arrow pb-carousel-arrow-right"
                  onClick={handleNewsNext}
                >
                  <Image
                    src={rightArrowIcon}
                    width={25}
                    height={25}
                    alt="right arrow"
                  />
                </button>
              </div>

              <div className="page-single__download-actions">
                <Button
                  color="default"
                  onClick={handleDownload}
                  disabled={isEmpty(resource) || loading}
                >
                  {T('common:download')}
                </Button>
                <Button onClick={handleShare} disabled={loading}>
                  {T('common:share')}
                </Button>
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
