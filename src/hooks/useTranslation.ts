// @ts-nocheck
import { useCallback } from 'react';
import { useTranslation as useI18nTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from 'helpers/string.helper';

export type UseTranslationReturnType = {
  // TODO: refactor types
  T: ReturnType<typeof useI18nTranslation>['t'];
  t: ReturnType<typeof useI18nTranslation>['t'];
};

// type TParameters = Parameters<ReturnType<typeof useI18nTranslation>['t']>;

export const useTranslation = () => {
  const { t, ...props } = useI18nTranslation();

  const T = useCallback(
    // TODO: refactor types
    (...other: any) => capitalizeFirstLetter(t(...other)),
    [t],
  );

  return { T, t, ...props };
};
