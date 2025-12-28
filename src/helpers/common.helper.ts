function isBoothOfflineMode() {
  return !!process.env.NEXT_PUBLIC_IS_DOWNLOAD_OFFLINE;
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export { isBoothOfflineMode, delay };
