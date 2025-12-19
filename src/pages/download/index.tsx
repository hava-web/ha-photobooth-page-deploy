/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-useless-fragment */
import { downloadFiles, shareLink } from 'api/common.api';
import {
  getDownloadData,
  getLanguagesData,
  getDownloadDataBoothOffline,
} from 'api/photo/download.api';
import {
  getUiTemplate,
  getUiTemplateBoothOffline,
} from 'api/ui-template/ui-template.api';
import { AssetIcons } from 'assets/icons/AssetIcons';
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
import EncycomEmbed from 'containers/encycom/EncycomEmbed';
import { handleUpdateCSSVar } from 'helpers/dom.helper';
import { isEqualVal, jsonParse } from 'helpers/string.helper';
import { isBoothOfflineMode } from 'helpers/common.helper';
import { I18nextProvider } from 'react-i18next';
import { filter, find, get, includes, isEmpty, map, size } from 'lodash';
import {
  DownloadDataStateModel,
  LanguageResponse,
} from 'models/download.model';
import { UiTemplateModel } from 'models/ui-template/ui-template.model';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'hooks/useTranslation';
import Select from 'components/select/Select';
import FloatingEarnPointButtons from './FloatingEarnPointButtons';
import downloadI18n from '../../i18n/download';

type DownloadFileProps = DownloadDataStateModel & {
  uiTemplateData: UiTemplateModel;
  languageData: LanguageResponse;
};

function DownloadFile({
  transactionId,
  downloadData,
  errorData,
  uiTemplateData,
  languageData,
}: DownloadFileProps) {
  const { t, T, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [resource, setResource] = useState<string[]>([]);
  const [isOpenPopover, setIsOpenPopover] = useState(true);
  const [language, setLanguage] = useState<string>('vi');
  const [uiTemplate, setUiTemplate] = useState<any>(uiTemplateData);

  console.log('ttt downloadData', downloadData, errorData);
  console.log('ttt uiTemplateData', uiTemplateData);
  console.log('ttt languageData', languageData);

  const photoTakenUrl = find(downloadData?.resources, (o) =>
    isEqualVal(o?.contentType, CONTENT_TYPES.PNG),
  )?.url;

  const langOtp = useMemo(
    () =>
      map(
        filter(languageData?.items, (i) => i.isActive === true),
        (lang) => ({
          value: lang?.code,
          label: (
            <div className="flex items-center gap-3 language-option">
              <img src={lang?.imageUrl} alt="img" />
              {lang?.name}
            </div>
          ),
        }),
      ),
    [],
  );

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

  const handleChangeLanguage = useCallback((language: any) => {
    setLanguage(language);
    i18n.changeLanguage(language);
  }, []);

  const logoImage = uiTemplate?.logoImageUrl || funLogoImage?.src;
  const seoMetaData = jsonParse(
    uiTemplate?.seoMetaDataJsonPageDownload || '',
    {},
  );
  const sloganText =
    uiTemplate?.sloganTextPageDownload || T('download:funStudioSlogan');
  const expiredText =
    uiTemplate?.expiredTextPageDownload || t('download:dataExpired');
  const noDataText = uiTemplate?.noDataTextPageDownload || t('download:noData');
  const uploadingText =
    uiTemplate?.uploadingTextPageDownload || t('download:dataIsUploading');

  useEffect(() => {
    if (uiTemplate?.backgroundPageDownload) {
      handleUpdateCSSVar(uiTemplate);
    }
  }, [uiTemplate]);

  useEffect(() => {
    setUiTemplate(uiTemplateData);
  }, [uiTemplateData]);

  useEffect(() => {
    const fetchUiTemplate = async () => {
      const res = isBoothOfflineMode()
        ? await getUiTemplateBoothOffline()
        : await getUiTemplate({ id: transactionId });

      setUiTemplate(res?.data);
    };

    fetchUiTemplate();
  }, [i18n.language]);

  useEffect(() => {
    if (uiTemplateData?.languageCode) {
      setLanguage(uiTemplateData.languageCode);
      i18n.changeLanguage(uiTemplateData.languageCode);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsOpenPopover(false);
    }, 15000);
  }, []);

  return (
    <>
      {!!size(seoMetaData) && <NextSeo {...seoMetaData} />}
      <div className={cx('page-single__layout')}>
        {!!uiTemplateData?.isEncycom && (
          <EncycomEmbed
            boothId={1}
            images={map(
              filter(downloadData?.resources, (o) =>
                isEqualVal(o?.contentType, CONTENT_TYPES.PNG),
              ),
              'url',
            )}
          />
        )}
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
          <>
            <Select
              options={langOtp}
              value={language}
              onChange={(value: any) => {
                handleChangeLanguage(value);
              }}
              OuterProps={{
                className: 'change-language-selection',
              }}
            />
          </>
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
              {isOpenPopover && (
                <div className="popup-download">
                  <Typography
                    variant={TYPOGRAPHY_VARIANTS.SMALL}
                    className="text-center font-bold flex justify-center items-center"
                  >
                    {T('common:choosePhotoToDownload')}
                  </Typography>
                  <div className="download__pb-popover-arrow" />
                </div>
              )}
              <div className="flex max-h-[60rem]">
                <button
                  type="button"
                  className="pb-carousel-arrow pb-carousel-arrow-left"
                  aria-label="prev slide"
                  onClick={handleNewsPrev}
                >
                  <AssetIcons.LeftIcon width={40} height={40} />
                </button>
                <Swiper onSwiper={setSwiper} loop>
                  {downloadData ? (
                    map(downloadData?.resources, (item, index) => (
                      <SwiperSlide
                        className="swiper-slide"
                        key={index}
                        onClick={() => handleAddResource(item.url)}
                      >
                        <div
                          className={`resource-container ${
                            includes(resource, item.url) && 'selected'
                          }`}
                        >
                          {isEqualVal(item?.contentType, CONTENT_TYPES.MP4) ? (
                            <video
                              className={`page-single__download-result-image ${
                                includes(resource, item.url) && 'selected'
                              }`}
                              poster={photoTakenUrl}
                              autoPlay
                              loop
                              muted
                              playsInline
                            >
                              <track kind="captions" />
                              <source src={item.url} type="video/mp4" />
                            </video>
                          ) : (
                            <img
                              src={item.url}
                              alt="result"
                              className={`page-single__download-result-image ${
                                includes(resource, item.url) && 'selected'
                              }`}
                            />
                          )}
                        </div>
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
                  aria-label="next slide"
                  onClick={handleNewsNext}
                >
                  <AssetIcons.RightIcon width={40} height={40} />
                </button>
              </div>
              {!isEmpty(downloadData?.resources) && (
                <div className="bg-black bg-opacity-40 w-[8rem] rounded-lg my-1">
                  <Typography
                    variant={TYPOGRAPHY_VARIANTS.SMALL}
                    className="page-single__download-result-image"
                  >
                    {resource?.length}/{downloadData?.resources?.length}
                  </Typography>
                </div>
              )}

              <Typography
                variant={TYPOGRAPHY_VARIANTS.XS}
                className="flex items-center justify-center text-remind-use-camera"
              >
                {T('common:textRemindUseCamera')}
              </Typography>

              <div className="page-single__download-actions">
                <Button
                  color="default"
                  onClick={handleDownload}
                  disabled={isEmpty(resource) || loading}
                >
                  {T('common:download')}
                </Button>
                {!isBoothOfflineMode() && (
                  <Button onClick={handleShare} disabled={loading}>
                    {T('common:share')}
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
                } ${T('common:time')} ${
                  moment(downloadData?.recordAt).format(DATE_FORMAT) || '_'
                }`}
                {!!downloadData?.device && (
                  <>{`, ${T('common:device')} ${downloadData?.device}`}</>
                )}
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

export default function DownloadFilePage(props: DownloadFileProps) {
  return (
    <I18nextProvider i18n={downloadI18n}>
      <DownloadFile {...props} />
    </I18nextProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const transactionId = get(query, `${QUERY_STRING.TRANSACTION}`) as string;

  try {
    const uiTemplateResponse = await (isBoothOfflineMode()
      ? getUiTemplateBoothOffline
      : getUiTemplate)({ id: transactionId });
    const downloadResponse = await (isBoothOfflineMode()
      ? getDownloadDataBoothOffline
      : getDownloadData)({ id: transactionId });
    const languageResponse = await getLanguagesData({});

    return {
      props: {
        transactionId,
        downloadData: downloadResponse?.data || null,
        uiTemplateData: uiTemplateResponse?.data || null,
        languageData: languageResponse?.data || null,
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
