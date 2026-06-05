import { apiGet } from 'api/request/adminRequest';
import { buildApiAssetUrl } from 'api/request/apiUrl';
import {
  GALLERY_ALBUM_FALLBACK_IMAGE,
  MOCK_GALLERY_ALBUMS,
  getMockGalleryAlbumDetail,
} from 'containers/marketing/data/galleryMockData';
import type {
  GalleryAlbumDetailModel,
  GalleryAlbumModel,
  GalleryPhotoModel,
} from 'models/gallery/gallery.model';

type GalleryApiRecord = Record<string, any>;

function getPayload(response: unknown): any {
  if (!response || typeof response !== 'object') return response;

  const record = response as GalleryApiRecord;
  return record.data ?? record.response ?? response;
}

function getItems(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.response?.items)) return payload.response.items;

  return [];
}

function normalizeNumber(value: unknown, fallback = 0) {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : fallback;
}

function normalizeImage(image?: string | null) {
  return image ? buildApiAssetUrl(image) : GALLERY_ALBUM_FALLBACK_IMAGE;
}

function normalizeAlbum(rawAlbum: any): GalleryAlbumModel | null {
  if (!rawAlbum || typeof rawAlbum !== 'object') return null;

  const id = rawAlbum.id ?? rawAlbum.albumId ?? rawAlbum.slug;
  if (id === undefined || id === null || id === '') return null;

  const photos = getItems(rawAlbum.photos ?? rawAlbum.images ?? []);
  const photoCount = normalizeNumber(
    rawAlbum.photoCount ??
      rawAlbum.totalPhotos ??
      rawAlbum.totalImages ??
      rawAlbum.totalItems,
    photos.length,
  );

  return {
    id: String(id),
    title:
      rawAlbum.title ??
      rawAlbum.name ??
      rawAlbum.albumName ??
      `Album ${String(id)}`,
    coverImage: normalizeImage(
      rawAlbum.coverImage ??
        rawAlbum.coverImageUrl ??
        rawAlbum.thumbnailUrl ??
        rawAlbum.imageUrl ??
        rawAlbum.image,
    ),
    photoCount,
    videoCount:
      rawAlbum.videoCount === undefined
        ? undefined
        : normalizeNumber(rawAlbum.videoCount),
    viewCount:
      rawAlbum.viewCount === undefined
        ? undefined
        : normalizeNumber(rawAlbum.viewCount),
    description: rawAlbum.description ?? rawAlbum.summary,
  };
}

function normalizePhoto(
  rawPhoto: any,
  albumId: string,
): GalleryPhotoModel | null {
  if (!rawPhoto || typeof rawPhoto !== 'object') return null;

  const image =
    rawPhoto.image ??
    rawPhoto.imageUrl ??
    rawPhoto.url ??
    rawPhoto.resourceUrl ??
    rawPhoto.path;

  if (!image) return null;

  const id = rawPhoto.id ?? rawPhoto.photoId ?? rawPhoto.resourceId ?? image;

  return {
    id: String(id),
    albumId,
    image: normalizeImage(image),
    title: rawPhoto.title ?? rawPhoto.name ?? 'Gallery photo',
  };
}

function normalizeAlbumList(response: unknown) {
  const payload = getPayload(response);

  return getItems(payload)
    .map(normalizeAlbum)
    .filter((album): album is GalleryAlbumModel => Boolean(album));
}

function normalizeAlbumDetail(
  response: unknown,
  albumId: string,
): GalleryAlbumDetailModel | null {
  const payload = getPayload(response);
  const albumPayload = payload?.album ?? payload?.detail ?? payload;
  const album = normalizeAlbum(albumPayload);
  const photoPayload =
    payload?.photos ??
    payload?.images ??
    payload?.resources ??
    payload?.items ??
    albumPayload?.photos ??
    albumPayload?.images ??
    [];
  const photos = getItems(photoPayload)
    .map((photo) => normalizePhoto(photo, album?.id ?? albumId))
    .filter((photo): photo is GalleryPhotoModel => Boolean(photo));

  if (!album && !photos.length) return null;

  return {
    album:
      album ??
      ({
        id: albumId,
        title: `Album ${albumId}`,
        coverImage: photos[0]?.image || GALLERY_ALBUM_FALLBACK_IMAGE,
        photoCount: photos.length,
      } satisfies GalleryAlbumModel),
    photos,
  };
}

export async function listGalleryAlbums(): Promise<GalleryAlbumModel[]> {
  try {
    const response = await apiGet<unknown>('/general/gallery/albums');
    const albums = normalizeAlbumList(response);

    return albums.length ? albums : MOCK_GALLERY_ALBUMS;
  } catch {
    return MOCK_GALLERY_ALBUMS;
  }
}

export async function getGalleryAlbumDetail(
  albumId: string,
): Promise<GalleryAlbumDetailModel | null> {
  try {
    const response = await apiGet<unknown>(
      `/general/gallery/albums/${albumId}`,
    );
    const albumDetail = normalizeAlbumDetail(response, albumId);

    if (albumDetail) {
      return albumDetail;
    }
  } catch {
    //
  }

  return getMockGalleryAlbumDetail(albumId);
}
