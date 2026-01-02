export type EventType = {
  _id: string;
  name: string;
  description: string;
  privacy: string;
  location: string;
  starttimestamp: string;
  endtimestamp: string;
  isonline: boolean;
  meetlink: string;
  category: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  owner: string;
  key: string;
};

export type EventWithTicketPrice = {
  _id: string;
  name: string;
  description: string;
  privacy: string;
  location: string;
  starttimestamp: string;
  endtimestamp: string;
  isonline: boolean;
  meetlink: string;
  category: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  owner: string;
  key: string;
  ticketPrice: number;
};
