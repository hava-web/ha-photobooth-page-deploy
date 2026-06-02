import type {
  GalleryAlbumDetailModel,
  GalleryAlbumModel,
  GalleryPhotoModel,
} from 'models/gallery/gallery.model';

export const GALLERY_ALBUM_FALLBACK_IMAGE =
  '/images/generated/gallery-card-docs.jpg';

const galleryImagePool = [
  GALLERY_ALBUM_FALLBACK_IMAGE,
  '/images/generated/gallery-card.jpg',
  '/images/generated/home-hero.jpg',
  '/images/generated/home-video-preview.jpg',
  '/images/generated/news-1.jpg',
  '/images/generated/news-2.jpg',
  '/images/generated/news-3.jpg',
];

export const MOCK_GALLERY_ALBUMS: GalleryAlbumModel[] = [
  {
    id: 'minh-anh-thao-le-wedding',
    title: 'Minh Anh & Thảo Lê Wedding',
    coverImage: GALLERY_ALBUM_FALLBACK_IMAGE,
    photoCount: 36,
    videoCount: 17,
    viewCount: 9,
    description: 'Album cưới phong cách Hàn Quốc tại Fun Studio.',
  },
  {
    id: 'friendship-photo-date',
    title: 'Friendship Photo Date',
    coverImage: '/images/generated/gallery-card.jpg',
    photoCount: 24,
    videoCount: 6,
    viewCount: 14,
    description: 'Khoảnh khắc vui vẻ cùng hội bạn thân.',
  },
  {
    id: 'couple-retro-booth',
    title: 'Couple Retro Booth',
    coverImage: '/images/generated/home-video-preview.jpg',
    photoCount: 18,
    videoCount: 4,
    viewCount: 21,
    description: 'Concept photobooth retro dành cho cặp đôi.',
  },
  {
    id: 'birthday-memories',
    title: 'Birthday Memories',
    coverImage: '/images/generated/news-1.jpg',
    photoCount: 12,
    videoCount: 2,
    viewCount: 7,
    description: 'Ảnh sinh nhật và kỷ niệm cùng bạn bè.',
  },
];

function createMockPhotos(album: GalleryAlbumModel): GalleryPhotoModel[] {
  return Array.from({ length: album.photoCount }, (_, index) => ({
    id: `${album.id}-photo-${index + 1}`,
    albumId: album.id,
    image: galleryImagePool[index % galleryImagePool.length],
    title: `${album.title} - Ảnh ${index + 1}`,
  }));
}

export const MOCK_GALLERY_ALBUM_DETAILS: GalleryAlbumDetailModel[] =
  MOCK_GALLERY_ALBUMS.map((album) => ({
    album,
    photos: createMockPhotos(album),
  }));

export function getMockGalleryAlbumDetail(albumId: string) {
  return (
    MOCK_GALLERY_ALBUM_DETAILS.find(
      (albumDetail) => albumDetail.album.id === albumId,
    ) || null
  );
}
