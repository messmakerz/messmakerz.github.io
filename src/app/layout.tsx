import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ThemeToggle from "@/components/ThemeToggle";
import TicketBadge from "@/components/TicketBadge";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "MESS — Production",
  description:
    "Mess Makers is Mishell's core community. Concept-driven events, fashion, music — bold, sexy, uncompromising.",
  icons: {
    icon: "/mess-small-logo.svg",
  },
  openGraph: {
    title: "MESS — Production",
    description: "Concept-driven events. Bold, sexy, uncompromising.",
    type: "website",
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
        <CustomCursor />
        <ThemeToggle />
        <TicketBadge />
        {children}
      </body>
    </html>
  );
}
