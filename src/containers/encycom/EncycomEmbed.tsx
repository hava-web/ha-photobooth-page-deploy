import Script from 'next/script';
import React, { useEffect } from 'react';

declare global {
  interface Window {
    EncycomEmbed?: (params: { ptbid: number; listimg: Array<string> }) => void;
  }
}

type EncycomEmbedProps = {
  images: Array<string>;
  boothId: number;
};

const EncycomEmbed: React.FC<EncycomEmbedProps> = ({ boothId, images }) => {
  useEffect(() => {
    if (window.EncycomEmbed) {
      window.EncycomEmbed({ ptbid: boothId, listimg: images });
    }
  }, []);

  return (
    <>
      <Script id="encycom-inline-script" strategy="afterInteractive">
        {`function a0_0x9304(_0x4220e9,_0x2b067c){var _0x1caf1=a0_0x1caf();return a0_0x9304=function(_0x93040f,_0x240846){_0x93040f=_0x93040f-0x97;var _0x4a21f2=_0x1caf1[_0x93040f];return _0x4a21f2;},a0_0x9304(_0x4220e9,_0x2b067c);}function a0_0x1caf(){var _0x368c47=['891039ZFoatY','documentElement','72866JSjkcO','parentNode','querySelector','error','https://cdn.encycom.com/encycom_sdk.js','[encycom-embed]\x20Lỗi\x20khi\x20gọi\x20init_settings_encycom:','11459790oLNkrQ','onerror','[encycom-embed]\x20init_settings_encycom\x20chưa\x20sẵn\x20sàng.','33hRvfKW','src','10585197mDnWmC','EncycomEmbed','658XPKjHa','init_settings_encycom','66GITaZQ','addEventListener','4gsjkoQ','onload','data-encycom-sdk','getElementsByTagName','script','appendChild','function','1239045GBcRyV','480000ifUKHE','script[data-encycom-sdk=\x221\x22]','load','87240OcAzSG','setAttribute','async'];a0_0x1caf=function(){return _0x368c47;};return a0_0x1caf();}(function(_0xfea67b,_0x3058f2){var _0x47716f=a0_0x9304,_0x555a75=_0xfea67b();while(!![]){try{var _0x312ab6=parseInt(_0x47716f(0xa5))/0x1+-parseInt(_0x47716f(0xa7))/0x2*(-parseInt(_0x47716f(0xb6))/0x3)+-parseInt(_0x47716f(0x97))/0x4*(-parseInt(_0x47716f(0x9e))/0x5)+parseInt(_0x47716f(0x9f))/0x6+-parseInt(_0x47716f(0xb4))/0x7*(-parseInt(_0x47716f(0xa2))/0x8)+parseInt(_0x47716f(0xb2))/0x9+parseInt(_0x47716f(0xad))/0xa*(-parseInt(_0x47716f(0xb0))/0xb);if(_0x312ab6===_0x3058f2)break;else _0x555a75['push'](_0x555a75['shift']());}catch(_0x43b4b0){_0x555a75['push'](_0x555a75['shift']());}}}(a0_0x1caf,0xbf518),function(_0x1bf487,_0x43e628){'use strict';var _0x3e32b5=a0_0x9304;var _0x10546b=_0x3e32b5(0xab);function _0x371930(_0x15139b){var _0x1cb6f8=_0x3e32b5;if(typeof _0x1bf487['init_settings_encycom']===_0x1cb6f8(0x9d))try{_0x1bf487[_0x1cb6f8(0xb5)](_0x15139b);}catch(_0x12691c){console[_0x1cb6f8(0xaa)](_0x1cb6f8(0xac),_0x12691c);}else console[_0x1cb6f8(0xaa)](_0x1cb6f8(0xaf));}function _0x52d834(_0x1fdc7e){var _0x1a9845=_0x3e32b5;if(typeof _0x1bf487['init_settings_encycom']===_0x1a9845(0x9d)){_0x371930(_0x1fdc7e);return;}if(_0x43e628[_0x1a9845(0xa9)](_0x1a9845(0xa0))){_0x1bf487[_0x1a9845(0xb7)](_0x1a9845(0xa1),function(){_0x371930(_0x1fdc7e);});return;}var _0x20ca7b=_0x43e628['createElement'](_0x1a9845(0x9b));_0x20ca7b[_0x1a9845(0xb1)]=_0x10546b,_0x20ca7b[_0x1a9845(0xa4)]=!![],_0x20ca7b[_0x1a9845(0xa3)](_0x1a9845(0x99),'1'),_0x20ca7b[_0x1a9845(0x98)]=function(){_0x371930(_0x1fdc7e);},_0x20ca7b[_0x1a9845(0xae)]=function(){var _0x43f960=_0x1a9845;console[_0x43f960(0xaa)]('[encycom-embed]\x20Không\x20load\x20được\x20encycom-sdk.js');};var _0x13cb85=_0x43e628[_0x1a9845(0x9a)]('script')[0x0],_0x4c6650=_0x13cb85&&_0x13cb85[_0x1a9845(0xa8)]?_0x13cb85[_0x1a9845(0xa8)]:_0x43e628['head']||_0x43e628[_0x1a9845(0xa6)];_0x4c6650[_0x1a9845(0x9c)](_0x20ca7b);}function _0x26e81e(_0x7d97d6){_0x52d834(_0x7d97d6?_0x7d97d6:{});}_0x1bf487[_0x3e32b5(0xb3)]=_0x26e81e;}(window,document));`}
      </Script>
      {/* <button onClick={() => window.EncycomEmbed()}>Run JS</button> */}
    </>
  );
};

export default EncycomEmbed;
