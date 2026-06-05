import {
  SERVICE_GALLERY_IMAGES,
  type MarketingImage,
} from 'store/static-data/marketing-pages.data';

type ServiceConceptCard = {
  image: MarketingImage;
  title: string;
  text: string;
};

const CONCEPT_TITLES = [
  'Concept The Railway Station',
  'Concept Timeless Station',
  'Concept Lucid Dream',
];

const CONCEPT_DESCRIPTIONS = [
  'Được lấy cảm hứng từ những cuộc hành trình, nơi mỗi nhà ga không chỉ là điểm khởi đầu mà còn là hành trình dẫn lối đến niềm vui. Cửa hàng đầu tiên sẽ mang chủ đề The Railway Station - Trạm Hỏa Xa, với 4 phòng chụp phong cách mới và 1 phòng chụp Robot Cabin (booth chụp đầu tiên tại VN sử dụng cánh tay robot, thay đổi góc chụp linh hoạt)',
  'Cùng lấy cảm hứng từ chuyến tàu cảm xúc, "Timeless Station" tái hiện những trạm dừng mang phong cách cổ điển, vintage và nhuốm màu điện ảnh hơn. Ba phòng chụp lần lượt được thiết kế như các toa tàu hỏa và phòng chiếu phim, mang đến trải nghiệm vừa hoài niệm vừa độc đáo.',
  'Lấy cảm hứng từ những giấc mơ mà con người có thể tự do điều khiển, "Lucid Dream" kết hợp nét huyền bí và rực rỡ khi mỗi phòng chụp đại diện cho một giấc mơ khác biệt mà khách hàng được trải nghiệm - từ không gian retro náo nhiệt, bể bơi sôi động đến phòng chụp tối giản và chân thật.',
];

export const CONCEPT_CARDS: ServiceConceptCard[] = SERVICE_GALLERY_IMAGES.map(
  (image, index) => ({
    image,
    title: CONCEPT_TITLES[index % CONCEPT_TITLES.length],
    text: CONCEPT_DESCRIPTIONS[index % CONCEPT_DESCRIPTIONS.length],
  }),
);
