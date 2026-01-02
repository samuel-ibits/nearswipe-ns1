export type Contestant = {
  category: Category; // Explicitly typed as Category
  _id: string;
  id: string;
  name: string;
  image: string;
  slug: string;
  age: number;
  propaganda: string;
  eventId: string;
  categoryId: string;
  votes: number;
  socialLinks: SocialLink[];
};

export type Category = {
  _id: string;
  name: string;
  description: string;
  price: number; // price per vote in Naira
};

export type SocialLink = {
  platform: string;
  url: string;
  handle: string;
  icon: string;
};
