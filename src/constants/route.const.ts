export const QUERY_STRING = {
  TRANSACTION: 't',
  BOOTH_CODE: 'bc',
  ORDER_ID: 'orderId',

  ACTION: 'action',
  URL: 'url',
  FE_CLOUD: {
    TRANSACTION_ID: 't',
    BOOTH_CODE: 'bc',
    IS_UPLOAD_PRINTING: 'isUploadPrinting',
  },
  ENV: 'env',
  VERSION: 'version',
  // Action IDs
  ACTION_ID: {
    PHOTO_ALBUM_SHARE_LINK: 'photoAlbumShareLink', // xử lý link photo album chia sẻ
    EARN_LOYALTY_POINT: 'getLoyaltyPoint', // tích điểm thành viên
    SYNC_TRANSACTION: 'syncTrans', // quét QR sau khi chụp để đồng bộ giao dịch
  },
};
