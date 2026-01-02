/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { PaymentIntent } from "./models/PaymentIntent";

type TokenCache = { token: string; expiresAt: number } | null;

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

let cachedToken: TokenCache = null;
const AUTH_URL = process.env.MONNIFY_BASE_URL!;
const CONTRACT_CODE = process.env.MONNIFY_CONTRACT_CODE!;
const API_KEY = process.env.MONNIFY_API_KEY!;
const SECRET_KEY = process.env.MONNIFY_SECRET_KEY!;

type Payload<TGateway extends string, TMeta> = {
  gateway: TGateway;
  email: string;
  amount: number;
  callback_url?: string;
  metadata: TMeta;
  redirectUrl?: string;
  userId?: string;
};

export const initializePayment = async (payload: Payload<string, any>) => {
  const { gateway } = payload;
  let checkout_url;

  if (gateway === "paystack") {
    const { email, amount, callback_url, metadata, gateway, userId } = payload;

    const reference =
      metadata.type === "vote"
        ? `TNPV_REF_${Date.now()}`
        : `TNP_REF_${Date.now()}`;

    await PaymentIntent.create({
      reference,
      gateway,
      amount,
      currency: "NGN",
      email,
      userId,
      metadata,
    });

    const res = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Kobo
        metadata,
        callback_url,
        reference,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    checkout_url = res.data.data.authorization_url;
  }

  if (gateway === "monnify") {
    const { email, amount, callback_url, metadata, gateway, userId } = payload;

    // Helper to fetch access token (with in-memory caching)
    async function getToken(): Promise<string> {
      const now = Date.now();
      if (cachedToken && cachedToken.expiresAt > now + 10_000) {
        return cachedToken.token;
      }

      const auth = Buffer.from(API_KEY + ":" + SECRET_KEY).toString("base64");
      const res = await fetch(`${AUTH_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { Authorization: `Basic ${auth}` },
      });

      const j = await res.json();
      if (!res.ok || !j.responseBody?.accessToken) {
        console.error("Failed to get token", j);
        throw new Error("Monnify auth failed");
      }
      const token = j.responseBody.accessToken as string;
      const ttl = (j.responseBody.expiresIn || 3600) * 1000;
      cachedToken = { token, expiresAt: now + ttl };
      return token;
    }

    const token = await getToken();

    const paymentReference =
      metadata.type === "vote"
        ? `TNMV_REF_${Date.now()}`
        : `TNM_REF_${Date.now()}`;

    const record: Record<string, any> = {
      amount: amount.toFixed(2),
      customerName: metadata.customerName,
      customerEmail: email,
      paymentReference,
      paymentDescription: metadata.paymentDescription,
      currencyCode: "NGN",
      contractCode: CONTRACT_CODE,
      redirectUrl: callback_url,
    };

    await PaymentIntent.create({
      reference: paymentReference,
      gateway,
      amount,
      currency: "NGN",
      email,
      userId,
      metadata,
    });

    const res = await fetch(
      `${AUTH_URL}/api/v1/merchant/transactions/init-transaction`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      }
    );

    const j = await res.json();

    checkout_url = j.responseBody.checkoutUrl;
  }

  const res = {
    checkout_url,
  };

  return res;
};

export async function verifyMonnifyPayment(reference: string) {
  try {
    // Step 1: Get access token
    const { data: authData } = await axios.post(
      `${AUTH_URL}/api/v1/auth/login`,
      {},
      {
        auth: {
          username: API_KEY,
          password: SECRET_KEY,
        },
      }
    );

    const token = authData?.responseBody?.accessToken;

    if (!token) {
      throw new Error("Failed to retrieve Monnify access token.");
    }

    // Step 2: Verify the transaction using the token
    const { data } = await axios.get(
      `${AUTH_URL}/api/v1/merchant/transactions/query?paymentReference=${reference}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: true,
      message: "Payment verified successfully",
      data,
    };
  } catch (error: any) {
    console.error(
      "Monnify Verification Error:",
      error?.response?.data || error
    );
    return {
      status: false,
      message: "Error verifying Monnify payment",
      error: error?.response?.data || error,
    };
  }
}

export async function verifyPaystackPayment(reference: string) {
  try {
    const { data } = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const payment = data?.data;

    return {
      status: true,
      message: data.message,
      data: payment, // contains all details (amount, status, metadata, etc.)
    };
  } catch (error: any) {
    console.error(
      "Paystack Verification Error:",
      error?.response?.data || error
    );
    return {
      status: false,
      message: "Error verifying Paystack payment",
      error: error?.response?.data || error,
    };
  }
}
