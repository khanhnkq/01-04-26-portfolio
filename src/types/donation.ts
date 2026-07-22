export type DonationStatus = "pending" | "amount_mismatch" | "paid";

export interface DonationCheckout {
  id: string;
  paymentCode: string;
  cups: number;
  amount: number;
  status: DonationStatus;
  expiresAt: string;
  qrUrl: string;
  bank: {
    code: string;
    accountNumber: string;
    accountName: string;
  };
}

export interface DonationStatusResponse {
  id: string;
  status: DonationStatus;
  paidAt: string | null;
  expiresAt: string;
}

export interface SupporterMessage {
  id: string;
  name: string;
  cups: number;
  amount: number;
  message: string;
  createdAt: string;
  avatarBg?: string;
}
