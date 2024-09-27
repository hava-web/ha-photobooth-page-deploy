// @ts-nocheck
import { useCallback } from 'react';
import useI18nTranslation from 'next-translate/useTranslation';
import { capitalizeFirstLetter } from 'helpers/string.helper';

export type UseTranslationReturnType = {
  // TODO: refactor types
  T: ReturnType<typeof useI18nTranslation>['t'];
  t: ReturnType<typeof useI18nTranslation>['t'];
};

// type TParameters = Parameters<ReturnType<typeof useI18nTranslation>['t']>;

export const useTranslation = () => {
  const { t } = useI18nTranslation();

  const T = useCallback(
    // TODO: refactor types
    (...other: any) => capitalizeFirstLetter(t(...other)),
    [t],
  );

  return { T, t };
};
