import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NearSwipe | One Tap. Global Presence.",
  description: "A smart NFC card and app designed for ambitious professionals connecting across Africa and the world. Network beyond borders with one tap.",
  keywords: ["NFC card", "digital business card", "networking", "Africa", "professionals", "smart card"],
  authors: [{ name: "NearSwipe" }],
  openGraph: {
    title: "NearSwipe | One Tap. Global Presence.",
    description: "A smart NFC card and app designed for ambitious professionals connecting across Africa and the world.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NearSwipe | One Tap. Global Presence.",
    description: "A smart NFC card and app designed for ambitious professionals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-[#0a0a0a] text-white`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
