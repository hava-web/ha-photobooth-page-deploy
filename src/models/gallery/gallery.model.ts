export type GalleryAlbumModel = {
  id: string;
  title: string;
  coverImage: string;
  photoCount: number;
  videoCount?: number;
  viewCount?: number;
  description?: string;
};

export type GalleryPhotoModel = {
  id: string;
  albumId: string;
  image: string;
  title: string;
};

export type GalleryAlbumDetailModel = {
  album: GalleryAlbumModel;
  photos: GalleryPhotoModel[];
};
