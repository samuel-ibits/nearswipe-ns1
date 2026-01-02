"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { TicketType } from "@/types/ticket";
import { EventType } from "@/types/event";
import { IConfig } from "@/lib/models/Config";

type CartItem = {
  ticket: TicketType;
  quantity: number;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phoneNumber: string;
  sendToDifferentEmail: "yes" | "no";
  attendees: [
    {
      firstName: string;
      lastName: string;
      email: string;
      confirmEmail: string;
    }
  ];
};

type CheckoutContextType = {
  cart: CartItem[];
  tickets: TicketType[];
  event: EventType | null;
  config: IConfig | null;
  setConfig: (config: IConfig | null) => void;
  updateCart: (ticket: TicketType, quantity: number) => void;
  isContactFormValid: boolean;
  setIsContactFormValid: (valid: boolean) => void;
  formData: FormData | null;
  setFormData: (data: FormData | null) => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

function encodeCart(cart: CartItem[]) {
  const compact = cart.map(({ ticket, quantity }) => ({
    _id: ticket._id,
    quantity,
  }));
  return encodeURIComponent(btoa(JSON.stringify(compact)));
}

function decodeCart(encoded: string): { _id: string; quantity: number }[] {
  try {
    return JSON.parse(atob(decodeURIComponent(encoded)));
  } catch {
    return [];
  }
}

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [event, setEvent] = useState<EventType | null>(null);
  const [config, setConfig] = useState<IConfig | null>(null);
  const [isContactFormValid, setIsContactFormValid] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    let isMounted = true;

    async function fetchEventAndTickets() {
      try {
        const res = await fetch(`/api/client/get/event/${slug}`);
        const data = await res.json();

        if (!data?.event?._id) return;

        if (isMounted) {
          setEvent(data.event);
          setConfig(data.config || null); // ✅ add config
        }

        const ticketRes = await fetch(
          `/api/client/get/tickets/${data.event._id}`
        );
        const { tickets } = await ticketRes.json();

        if (isMounted) {
          setTickets(tickets || []);

          const encoded = searchParams.get("cart");
          if (encoded) {
            const minimalCart = decodeCart(encoded);
            const hydrated = minimalCart
              .map(({ _id, quantity }) => {
                const ticket = tickets.find((t: TicketType) => t._id === _id);
                return ticket ? { ticket, quantity } : null;
              })
              .filter(Boolean) as CartItem[];

            setCart(hydrated);
          }
        }
      } catch (err) {
        console.error("Failed to load event/tickets/config", err);
      }
    }

    if (slug) fetchEventAndTickets();

    return () => {
      isMounted = false;
    };
  }, [searchParams, slug]);

  const updateCart = (ticket: TicketType, quantity: number) => {
    setCart((prev) => {
      let updated: CartItem[];
      const existing = prev.find((item) => item.ticket._id === ticket._id);

      if (quantity === 0) {
        updated = prev.filter((item) => item.ticket._id !== ticket._id);
      } else if (existing) {
        updated = prev.map((item) =>
          item.ticket._id === ticket._id ? { ...item, quantity } : item
        );
      } else {
        updated = [...prev, { ticket, quantity }];
      }

      const encoded = encodeCart(updated);
      const newParams = new URLSearchParams(window.location.search);
      newParams.set("cart", encoded);
      router.replace(`?${newParams.toString()}`);
      return updated;
    });
  };

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        tickets,
        event,
        config,
        setConfig,
        updateCart,
        isContactFormValid,
        setIsContactFormValid,
        formData,
        setFormData,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCart must be used within a CheckoutProvider");
  }
  return context;
}
