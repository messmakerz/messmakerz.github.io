import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollRefresh from "@/components/ScrollRefresh";

export const metadata: Metadata = {
  title: "MESS — Production",
  description:
    "Mess Makers is Mishell's core community. Concept-driven events, fashion, music — bold, sexy, uncompromising.",
  icons: {
    icon: [
      { url: "/mess-small-logo.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "MESS — Production",
    description: "Concept-driven events. Bold, sexy, uncompromising.",
    type: "website",
    url: "https://messmakerz.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MESS Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MESS — Production",
    description: "Concept-driven events. Bold, sexy, uncompromising.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // dark class = dark mode by default
    <html lang="en" className="h-full dark">
      <body className="min-h-full">
        <LoadingScreen />
        <ScrollRefresh />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
