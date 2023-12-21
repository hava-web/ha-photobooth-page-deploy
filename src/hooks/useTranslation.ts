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

export const useTranslation = (
  ...props: Parameters<typeof useI18nTranslation>
) => {
  const { t } = useI18nTranslation(...props);

  const T = useCallback(
    // TODO: refactor types
    (...other: any) => capitalizeFirstLetter(t(...other)),
    [t],
  );

  return { T, t };
};
