import crypto from "crypto";
import axios from "axios";

export const getNigerianBanks = async () => {
  try {
    const { data } = await axios.get(
      "https://api.paystack.co/bank?country=nigeria"
    );
    return data.data; // array of banks
  } catch (error) {
    console.error("Failed to fetch banks:", error);
    return [];
  }
};

type FeeConfig = {
  percentage?: number | string;
  flat_rate?: number | string;
};

export function getTotalWithoutFees(
  priceWithFees: number,
  config: FeeConfig = {}
): number {
  const flatFeeSource =
    config?.flat_rate != null
      ? String(config.flat_rate)
      : process.env.NEXT_PUBLIC_TRANSACTION_FLAT_FEE;

  const flatFee = parseFloat(flatFeeSource ?? "0");

  const percentFeeSource =
    config?.percentage != null
      ? String(config.percentage)
      : process.env.NEXT_PUBLIC_TRANSACTION_PERCENT_FEE;

  const percentFee = parseFloat(percentFeeSource ?? "0");

  // Deduct percentage, then flat fee
  const priceWithoutFees =
    priceWithFees - priceWithFees * (percentFee / 100) - flatFee;

  // Round down to 2 decimal places and return as number
  return Math.floor(priceWithoutFees * 100) / 100;
}

export function getTotalWithoutVotingFees(priceWithFees: number): number {
  const percentFee = parseFloat(
    process.env.NEXT_PUBLIC_VOTING_TRANSACTION_PERCENT_FEE || "0"
  );
  const flatFee = parseFloat(
    process.env.NEXT_PUBLIC_VOTING_TRANSACTION_FLAT_FEE || "0"
  );

  // Deduct percentage, then flat fee
  const priceWithoutFees =
    priceWithFees - priceWithFees * (percentFee / 100) - flatFee;

  // Round down to 2 decimal places and return as number
  return Math.floor(priceWithoutFees * 100) / 100;
}

// lib/utils/profitFormula.ts
export function profitFormula(amountPaid: number, reference: string): number {
  if (!amountPaid || !reference) return 0;

  let gatewayFee = 0;
  let profit = 0;

  // Detect gateway from reference
  if (reference.startsWith("TNM")) {
    // Monnify charges 1.613% capped at ₦2000
    gatewayFee = amountPaid * 0.01613;
    if (gatewayFee > 2000) gatewayFee = 2000;

    // Our profit = 3% - Monnify fee + ₦100 (since Monnify doesn’t take it)
    profit = amountPaid * 0.03 - gatewayFee + 100;
  } else if (reference.startsWith("TNP")) {
    // Paystack charges 1.5% + ₦100 capped at ₦2000
    gatewayFee = amountPaid * 0.015 + 100;
    if (gatewayFee > 2000) gatewayFee = 2000;

    // Our profit = 3% - Paystack fee
    profit = amountPaid * 0.03 + 100 - gatewayFee;
  }

  // Ensure no negative profit
  if (profit < 0) profit = 0;

  return Math.floor(profit * 100) / 100; // round to nearest Naira with 2 decimals
}

export const formatDateTime = (iso: string) => {
  const date = new Date(iso);
  return (
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    ", " +
    date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  );
};

export const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength - 1) + "…" : text;
};

export const truncateResponsive = (
  text: string,
  mobileMax: number,
  tabletMax: number,
  desktopMax: number
) => {
  if (typeof window === "undefined") return truncateText(text, desktopMax);

  const width = window.innerWidth;
  let max = desktopMax;

  if (width < 640) {
    max = mobileMax; // Mobile: < 640px (Tailwind's `sm`)
  } else if (width >= 640 && width < 1024) {
    max = tabletMax; // Tablet: 640px to <1024px (`sm` to `lg`)
  } else {
    max = desktopMax; // Desktop: ≥ 1024px
  }

  return truncateText(text, max);
};

export async function logoutUser() {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      window.location.href = "/login";
    } else {
      console.error("Failed to logout");
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
}

export async function getUserWallet() {
  try {
    const res = await fetch("/api/admin/wallet/balance", {
      method: "GET",
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error("Failed to fetch user wallet");
      return null;
    }
  } catch (err) {
    console.error("Error fetching user wallet:", err);
    return null;
  }
}

export async function getPayouts() {
  try {
    const res = await fetch("/api/admin/payout/get", {
      method: "GET",
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error("Failed to fetch payouts");
      return [];
    }
  } catch (err) {
    console.error("Error fetching payouts:", err);
    return [];
  }
}

export function generateSlugSuggestions(baseSlug: string) {
  const suffix = () => Math.random().toString(36).substring(2, 5); // random 3-letter suffix
  return [
    `${baseSlug}-${suffix()}`,
    `${baseSlug}-${suffix()}`,
    `${baseSlug}-${suffix()}`,
  ];
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateTicketKey() {
  return crypto.randomBytes(20).toString("hex");
}

export function generateKey(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < 4; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

export const deleteImageFromCloudinary = async (publicId: string) => {
  try {
    await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id: publicId }),
    });
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", error);
  }
};
