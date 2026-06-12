export const TIME_OUT_API = 30000;
export const PREFIX_API = {
  API: 'api',
  FILE: 'file',
};

export const FILES_PER_BATCH = 10;
export const BETWEEN_FILE_DELAY_MS = 220;
export const BETWEEN_BATCH_DELAY_MS = 1800;

// iOS share: max images per share sheet call (videos are always 1 at a time)
export const IOS_IMAGE_BATCH_SIZE = 5;
// Retry failed fetches up to this many times before giving up
export const MAX_FETCH_RETRY = 3;
export const FETCH_RETRY_DELAY_MS = 600;
