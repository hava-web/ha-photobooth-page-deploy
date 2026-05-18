/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-useless-fragment */
import { downloadFile, downloadSequential } from 'api/common.api';
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
import { chunk, filter, get, includes, isEmpty, map, size } from 'lodash';
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
import PinModal from './PinModal';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [resource, setResource] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>('vi');
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isCheckingPin, setIsCheckingPin] = useState(
    !downloadData?.resources?.length,
  );
  const [localDownloadData, setLocalDownloadData] = useState(downloadData);

  const pinStorageKey = `pin_${transactionId}`;

  useEffect(() => {
    if (!uiTemplateData?.isPinCodeDownload) {
      setIsCheckingPin(false);
      return;
    }
    if (!isCheckingPin) return;
    const savedPin = sessionStorage.getItem(pinStorageKey);
    if (savedPin) {
      getDownloadData({ id: transactionId, pinCodeDownload: savedPin })
        .then((res) => {
          if (!res.data) {
            sessionStorage.removeItem(pinStorageKey);
            setIsCheckingPin(false);
            setIsPinModalOpen(true);
            return;
          }
          setLocalDownloadData(res.data);
          setIsCheckingPin(false);
        })
        .catch(() => {
          sessionStorage.removeItem(pinStorageKey);
          setIsCheckingPin(false);
          setIsPinModalOpen(true);
        });
    } else {
      setIsCheckingPin(false);
      setIsPinModalOpen(true);
    }
  }, []);
  const [uiTemplate, setUiTemplate] = useState<any>(uiTemplateData);
  const [previewItem, setPreviewItem] = useState<{
    url: string;
    contentType: string;
  } | null>(null);

  console.log('ttt downloadData', downloadData, errorData);
  console.log('ttt uiTemplateData', uiTemplateData);
  console.log('ttt languageData', languageData);

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
    await downloadSequential(resource, `${FILE_IMAGE_DOWNLOAD}`);
    setResource([]);
    setLoading(false);
  };

  const resourceWithoutQRphoto = useMemo(
    () =>
      filter(
        localDownloadData?.resources,
        (item) => !includes(item?.url, '_QR'),
      ),
    [localDownloadData],
  );

  const resourceChunks = useMemo(
    () => chunk(resourceWithoutQRphoto, 9),
    [resourceWithoutQRphoto],
  );

  const handleAddResource = (url: string) => {
    setResource((item) =>
      item.includes(url) ? item.filter((i) => i !== url) : [...item, url],
    );
  };

  const isAllSelected =
    resourceWithoutQRphoto?.length > 0 &&
    resource.length === resourceWithoutQRphoto?.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setResource([]);
    } else {
      setResource(map(resourceWithoutQRphoto, 'url'));
    }
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
      try {
        const res = isBoothOfflineMode()
          ? await getUiTemplateBoothOffline()
          : await getUiTemplate({ id: transactionId });

        setUiTemplate(res?.data);
      } catch (err) {
        setUiTemplate(null);
      }
    };

    fetchUiTemplate();
  }, [i18n.language]);

  useEffect(() => {
    if (uiTemplateData?.languageCode) {
      setLanguage(uiTemplateData.languageCode);
      i18n.changeLanguage(uiTemplateData.languageCode);
    }
  }, []);

  return (
    <>
      {!!size(seoMetaData) && <NextSeo {...seoMetaData} />}
      <PinModal
        open={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onConfirm={(pin) => {
          getDownloadData({
            id: transactionId,
            pinCodeDownload: pin,
          })
            .then((res) => {
              if (!res?.data) {
                sessionStorage.removeItem(pinStorageKey);
                setLocalDownloadData(null);
                setIsPinModalOpen(true);
                return;
              }
              sessionStorage.setItem(pinStorageKey, pin);
              setLocalDownloadData(res.data);
              setIsPinModalOpen(false);
            })
            .catch(() => {
              sessionStorage.removeItem(pinStorageKey);
              setLocalDownloadData(null);
              setIsPinModalOpen(true);
            });
        }}
      />
      <div className={cx('page-single__layout')}>
        {!!uiTemplateData?.isEncycom && !!size(downloadData?.resources) && (
          <EncycomEmbed
            boothId={uiTemplateData?.boothId}
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
          {!!localDownloadData && uiTemplateData?.isAllowEarnPoint && (
            <FloatingEarnPointButtons transactionId={transactionId} />
          )}
          {!localDownloadData || !!localDownloadData?.isExpired ? (
            <Typography
              variant={TYPOGRAPHY_VARIANTS.SMALL}
              className="page-single__download-result-image"
            >
              {localDownloadData?.isExpired ? expiredText : noDataText}
            </Typography>
          ) : (
            <>
              <div className="flex flex-1 items-center overflow-hidden min-h-0">
                <button
                  type="button"
                  className="pb-carousel-arrow pb-carousel-arrow-left"
                  aria-label="prev slide"
                  onClick={handleNewsPrev}
                  style={{
                    visibility:
                      resourceChunks.length < 2 ? 'hidden' : 'visible',
                  }}
                >
                  <AssetIcons.LeftIcon width={40} height={40} />
                </button>
                <div className="images-swiper-container">
                  <div className="select-all-checkbox">
                    <input
                      id="select-all-checkbox"
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                    <label htmlFor="select-all-checkbox">
                      {T('common:selectAll')}
                    </label>
                  </div>
                  <Swiper
                    onSwiper={setSwiper}
                    onSlideChange={(s) => setActiveIndex(s.realIndex)}
                    className="w-full h-full"
                    loop
                  >
                    {localDownloadData ? (
                      map(resourceChunks, (chunkItems, chunkIndex) => (
                        <SwiperSlide className="swiper-slide" key={chunkIndex}>
                          <div className="grid grid-cols-3 grid-rows-3 gap-[0.4rem] w-full h-full">
                            {map(chunkItems, (item, index) => (
                              <div
                                key={index}
                                className={`resource-container ${
                                  includes(resource, item.url) && 'selected'
                                }`}
                                onClick={() => handleAddResource(item.url)}
                                aria-hidden="true"
                              >
                                <button
                                  type="button"
                                  className="resource-eye-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewItem(item);
                                  }}
                                  aria-label="preview"
                                >
                                  <AssetIcons.EyeIcon
                                    width={16}
                                    height={16}
                                    fill="white"
                                  />
                                </button>
                                {isEqualVal(
                                  item?.contentType,
                                  CONTENT_TYPES.MP4,
                                ) ||
                                isEqualVal(
                                  item?.contentType,
                                  CONTENT_TYPES.VIDEO_GIF,
                                ) ? (
                                  <video
                                    className={`page-single__download-result-image ${
                                      includes(resource, item.url) && 'selected'
                                    }`}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    // eslint-disable-next-line react/no-unknown-property
                                    webkit-playsinline="true"
                                    // eslint-disable-next-line react/no-unknown-property
                                    x5-playsinline="true"
                                    preload="auto"
                                    onLoadedMetadata={(e) => {
                                      const video = e.currentTarget;
                                      video.play().catch(() => {});
                                    }}
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
                            ))}
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
                </div>
                <button
                  type="button"
                  className="pb-carousel-arrow pb-carousel-arrow-right"
                  aria-label="next slide"
                  onClick={handleNewsNext}
                  style={{
                    visibility:
                      resourceChunks.length < 2 ? 'hidden' : 'visible',
                  }}
                >
                  <AssetIcons.RightIcon width={40} height={40} />
                </button>
              </div>
              {resourceChunks.length >= 2 && (
                <div className="flex items-center justify-center gap-2 my-1">
                  {map(resourceChunks, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`slide ${i + 1}`}
                      onClick={() => swiper?.slideToLoop(i)}
                      className={cx(
                        'w-[1.2rem] h-[1.2rem] rounded-full transition-all duration-200',
                        i === activeIndex
                          ? 'bg-[var(--sync-primary-color)] scale-125'
                          : 'bg-[var(--sync-primary-color)] opacity-40',
                      )}
                    />
                  ))}
                </div>
              )}
              {!isEmpty(localDownloadData?.resources) && (
                <div className="bg-black bg-opacity-40 w-[8rem] rounded-lg my-1">
                  <Typography
                    variant={TYPOGRAPHY_VARIANTS.SMALL}
                    className="page-single__download-result-image"
                  >
                    {resource?.length}/{resourceWithoutQRphoto?.length}
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
              </div>
              <Typography
                variant={TYPOGRAPHY_VARIANTS.SMALL}
                className="text-center font-bold"
              >
                {t('download:linkExpireInFiveDays')}
              </Typography>
              <Typography
                variant={TYPOGRAPHY_VARIANTS.SMALL}
                className="text-center machine-info-text"
              >
                {`${
                  moment(localDownloadData?.recordAt).format(
                    HOUR_MINUTE_FORMAT,
                  ) || '_'
                } ${T('common:time')} ${
                  moment(localDownloadData?.recordAt).format(DATE_FORMAT) || '_'
                }`}
                {!!localDownloadData?.device && (
                  <>{`, ${T('common:device')} ${localDownloadData?.device}`}</>
                )}
              </Typography>
            </>
          )}
        </Loader>
      </div>

      {previewItem && (
        <div
          className="preview-modal-overlay"
          onClick={() => setPreviewItem(null)}
          aria-hidden="true"
        >
          <div className="header-preview-modal">
            <button
              type="button"
              className="preview-modal-download"
              onClick={(e) => {
                e.stopPropagation();
                downloadFile(previewItem.url, FILE_IMAGE_DOWNLOAD);
              }}
              aria-label="download"
            >
              <AssetIcons.DownloadIcon
                width={20}
                height={20}
                className="text-white"
              />
            </button>
            <span className="preview-modal-index">
              {resourceWithoutQRphoto.findIndex(
                (r) => r.url === previewItem.url,
              ) + 1}
              /{resourceWithoutQRphoto.length}
            </span>
            <button
              type="button"
              className="preview-modal-close"
              onClick={() => setPreviewItem(null)}
              aria-label="close preview"
            >
              ✕
            </button>
          </div>
          <div
            className="preview-modal-content"
            onClick={(e) => e.stopPropagation()}
            aria-hidden="true"
          >
            <button
              type="button"
              className="pb-carousel-arrow pb-carousel-arrow-left"
              aria-label="prev image"
              onClick={(e) => {
                e.stopPropagation();
                const idx = resourceWithoutQRphoto.findIndex(
                  (r) => r.url === previewItem.url,
                );
                const prev =
                  resourceWithoutQRphoto[
                    (idx - 1 + resourceWithoutQRphoto.length) %
                      resourceWithoutQRphoto.length
                  ];
                setPreviewItem(prev);
              }}
            >
              <AssetIcons.LeftIcon width={40} height={40} />
            </button>
            {isEqualVal(previewItem.contentType, CONTENT_TYPES.MP4) ||
            isEqualVal(previewItem.contentType, CONTENT_TYPES.VIDEO_GIF) ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="preview-modal-media"
              >
                <track kind="captions" />
                <source src={previewItem.url} type="video/mp4" />
              </video>
            ) : (
              <img
                src={previewItem.url}
                alt="preview"
                className="preview-modal-media"
              />
            )}
            <button
              type="button"
              className="pb-carousel-arrow pb-carousel-arrow-right"
              aria-label="next image"
              onClick={(e) => {
                e.stopPropagation();
                const idx = resourceWithoutQRphoto.findIndex(
                  (r) => r.url === previewItem.url,
                );
                const next =
                  resourceWithoutQRphoto[
                    (idx + 1) % resourceWithoutQRphoto.length
                  ];
                setPreviewItem(next);
              }}
            >
              <AssetIcons.RightIcon width={40} height={40} />
            </button>
          </div>
        </div>
      )}
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
    const [uiTemplateResponse, downloadResponse, languageResponse] =
      await Promise.allSettled([
        (isBoothOfflineMode() ? getUiTemplateBoothOffline : getUiTemplate)({
          id: transactionId,
        }),
        (isBoothOfflineMode() ? getDownloadDataBoothOffline : getDownloadData)({
          id: transactionId,
          pinCodeDownload: '',
        }),
        getLanguagesData({}),
      ]);

    return {
      props: {
        transactionId,
        downloadData:
          downloadResponse.status === 'fulfilled'
            ? downloadResponse.value?.data || null
            : null,
        uiTemplateData:
          uiTemplateResponse.status === 'fulfilled'
            ? uiTemplateResponse.value?.data || null
            : null,
        languageData:
          languageResponse.status === 'fulfilled'
            ? languageResponse.value?.data || null
            : null,
        errorData:
          downloadResponse.status === 'rejected'
            ? JSON.parse(JSON.stringify(downloadResponse.reason))
            : null,
      },
    };
  } catch (err) {
    return {
      props: {
        transactionId,
        downloadData: null,
        uiTemplateData: null,
        languageData: null,
        errorData: JSON.parse(JSON.stringify(err)),
      },
    };
  }
};
