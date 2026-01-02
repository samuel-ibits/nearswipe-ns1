export type Wallet = {
  userId: string;
  balance: number;
  alltimeEarnings: number;
  lastUpdated: Date;
};

export type WalletTransaction = {
  _id: string;
  type: "credit" | "debit";
  amount: number;
  reference: string;
  createdAt: string;
  description?: string;
  status: string;
};
