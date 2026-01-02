export type TicketType = {
  _id: string;
  event: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  privacy: string;
  isGroup: boolean;
  groupNo: number;
  perks: string[];
  createdAt?: string;
  updatedAt?: string;
};

export interface TicketOrder {
  ticketTitle: string;
  customerName: string;
  email: string;
  ticketId: string;
  qrCodePath?: string;
}
