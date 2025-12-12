import { AssetIcons } from 'assets/icons/AssetIcons';
import cx from 'classnames';
import Typography from 'components/typography/Typography';
import { TYPOGRAPHY_VARIANTS } from 'components/typography/typography-utils';
import { QUERY_STRING } from 'constants/route.const';
import { useTranslation } from 'hooks/useTranslation';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

export type FloatingEarnPointButtonsType = {
  transactionId: string;
};

const FloatingEarnPointButtons: React.FC<FloatingEarnPointButtonsType> = ({
  transactionId,
}) => {
  const { t } = useTranslation();
  const [isOpenEarnPointPopup, setIsOpenEarnPointPopup] =
    useState<boolean>(true);
  const pathname = usePathname(); // e.g. "/products/123"
  const searchParams = useSearchParams(); // e.g. ?ref=home

  const zmaEarnPointLink = useMemo(() => {
    const fullUrl = `${
      process.env.NEXT_PUBLIC_APP_URL
    }${pathname}?${searchParams.toString()}`;

    return `${process.env.NEXT_PUBLIC_ZMA_APP_URL}&${QUERY_STRING.TRANSACTION}=${transactionId}&${QUERY_STRING.ACTION}=${QUERY_STRING?.ACTION_ID.SYNC_TRANSACTION}&${QUERY_STRING.URL}=${fullUrl}`;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpenEarnPointPopup(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="floating-earn-point-buttons">
      {isOpenEarnPointPopup && (
        <div className="earn-point-popover-content">
          <Typography
            variant={TYPOGRAPHY_VARIANTS.XS}
            firstCapCase
            className={cx('page-single__btn-earn-point--text text-pb-xs')}
          >
            {t('common:takePictureButNotEarn')}
          </Typography>
          <div className={cx('earn-point__pb-popover-arrow')} />
        </div>
      )}
      <a
        href={zmaEarnPointLink}
        target="_blank"
        rel="noreferrer"
        // type="button"
        // onClick={handleScanQRAndEarnPoint}
        className="page-single__btn-earn-point"
      >
        <AssetIcons.GiftFillIcon className="page-single__btn-earn-point--icon" />{' '}
        <Typography
          variant={TYPOGRAPHY_VARIANTS.XS}
          firstCapCase
          className={cx('page-single__btn-earn-point--text text-pb-xs')}
        >
          {t('common:earnPointAndReceiveGift')}
        </Typography>
      </a>
    </div>
  );
};

export default FloatingEarnPointButtons;
