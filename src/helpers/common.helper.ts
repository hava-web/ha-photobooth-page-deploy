function isBoothOfflineMode() {
  return !!process.env.NEXT_PUBLIC_IS_DOWNLOAD_OFFLINE;
}

export { isBoothOfflineMode };
