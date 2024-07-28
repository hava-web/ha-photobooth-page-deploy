import { UiTemplateModel } from 'models/ui-template/ui-template.model';

function handleUpdateCSSVar(uiTemplateData: UiTemplateModel) {
  if (typeof document !== 'undefined' && uiTemplateData) {
    document.documentElement.style.setProperty(
      '--sync-primary-color',
      uiTemplateData?.primaryColor,
    );
    document.documentElement.style.setProperty(
      '--sync-secondary-color',
      uiTemplateData?.secondaryColor,
    );
    document.documentElement.style.setProperty(
      '--sync-text-color',
      uiTemplateData?.textColor,
    );
    document.documentElement.style.setProperty(
      '--sync-button-text-color',
      uiTemplateData?.buttonTextColor,
    );
    document.documentElement.style.setProperty(
      '--sync-button-border-color',
      uiTemplateData?.buttonBorderColor,
    );
    document.documentElement.style.setProperty(
      '--sync-input-background-color',
      uiTemplateData?.inputBackgroundColor,
    );
    document.documentElement.style.setProperty(
      '--sync-title-color',
      uiTemplateData?.titleColor,
    );
    document.documentElement.style.setProperty(
      '--sync-border-title-1-color',
      uiTemplateData?.borderTitleColor1,
    );
    document.documentElement.style.setProperty(
      '--sync-border-title-2-color',
      uiTemplateData?.borderTitleColor2,
    );
    document.documentElement.style.setProperty(
      '--background-image-url',
      `url(${uiTemplateData?.backgroundImageUrl})`,
    );
    document.documentElement.style.setProperty(
      '--phone-background-image-url',
      `url(${uiTemplateData?.backgroundPageDownload})`,
    );

    const styleElement = document.createElement('style');

    styleElement.innerHTML = uiTemplateData?.customCssPageDownload;

    document.head.appendChild(styleElement);
  }
}

export { handleUpdateCSSVar };
