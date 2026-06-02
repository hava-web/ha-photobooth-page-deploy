import React, { useEffect } from 'react';
import { compact, concat, get, map, size } from 'lodash';
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
import Button from 'components/button/Button';
import UploadMultiple from 'components/upload/UploadMultiple';
import { uploadPrintingPhoto } from 'api/photo/upload-photo.api';
import Loader from 'components/loader/Loader';
import { NoIndexPageSeo } from 'components/seo/PageSeo';

type UploadPhotoProps = DownloadDataStateModel & {
  uiTemplateData: UiTemplateModel;
  boothCode: string;
  transactionId: string;
};

export default function UploadPhotoFile({
  boothCode,
  transactionId,
  uiTemplateData,
}: UploadPhotoProps) {
  const { t } = useTranslation();
  const [uploadPhotos, setUploadPhotos] = React.useState<File[]>([]);
  const [uploadPhotoSources, setUploadPhotoSources] = React.useState<string[]>(
    [],
  );
  const [isUploading, setIsUploading] = React.useState(false);

  const logoImage = uiTemplateData?.logoImageUrl || funLogoImage?.src;
  const seoMetaData = jsonParse(
    uiTemplateData?.seoMetaDataJsonPageDownload || '',
    {},
  );

  const handleUploadPhoto = async () => {
    setIsUploading(true);
    const uploadRes = await uploadPrintingPhoto({
      boothCode,
      transaction: transactionId,
      images: uploadPhotos,
    }).finally(() => setIsUploading(false));
    console.log('ttt uploadRes', uploadRes);
  };

  useEffect(() => {
    if (uiTemplateData?.backgroundPageDownload) {
      handleUpdateCSSVar(uiTemplateData);
    }
  }, [uiTemplateData]);

  return (
    <>
      <NoIndexPageSeo
        path="/upload-photo"
        overrides={{
          title: 'Tải ảnh lên Fun Studio',
          description:
            'Trang tải ảnh lên theo giao dịch dành cho khách hàng Fun Studio.',
          ...seoMetaData,
        }}
      />
      <div className="page-single__layout">
        <Background />
        <Loader
          loading={isUploading}
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
            {t('download:funStudioSlogan')}
          </Typography>
          {!!boothCode && (
            <>
              <div className="page-single__download-actions upload-photo__actions">
                <UploadMultiple
                  color="default"
                  onChange={(files, sources) => {
                    setUploadPhotos((f) => compact(concat(f, files)));
                    setUploadPhotoSources((s) => compact(concat(s, sources)));
                  }}
                >
                  <Button color="default" style={{ pointerEvents: 'none' }}>
                    {size(uploadPhotos)
                      ? t('common:uploadMoreImage')
                      : t('common:uploadImage')}
                  </Button>
                </UploadMultiple>
                {!!size(uploadPhotos) && (
                  <Button
                    color="primary"
                    onClick={handleUploadPhoto}
                    className="upload-photo__btn-submit"
                    disabled={isUploading}
                  >
                    {t('common:confirm')}
                  </Button>
                )}
              </div>
              {!!size(uploadPhotoSources) && (
                <div className="upload-photo_preview-grid">
                  {map(uploadPhotoSources, (photo) => (
                    <img
                      src={photo}
                      alt="start mascot"
                      className="thumbnail-preview"
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </Loader>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const transactionId = get(query, `${QUERY_STRING.TRANSACTION}`) as string;
  const boothCode = get(query, `${QUERY_STRING.BOOTH_CODE}`) as string;

  const props = {
    transactionId,
    boothCode,
  };

  try {
    const uiTemplateResponse = await getUiTemplate({ id: transactionId });

    return {
      props: {
        ...props,
        uiTemplateData: uiTemplateResponse?.data || null,
      },
    };
  } catch (err) {
    return {
      props: {
        ...props,
        downloadData: null,
        errorData: JSON.parse(JSON.stringify(err)),
      },
    };
  }
};
