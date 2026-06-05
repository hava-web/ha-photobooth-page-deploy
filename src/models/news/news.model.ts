export type NewsCardModel = {
  id: string;
  image: string;
  title: string;
  text: string;
};

export type NewsDetailModel = NewsCardModel & {
  content: string[];
};
