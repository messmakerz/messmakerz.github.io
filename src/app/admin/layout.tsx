import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MESS ADMIN",
  description: "Mess Admin Panel",
  openGraph: {
    title: "MESS ADMIN",
    description: "Mess Admin Panel",
    images: [
      {
        url: "/og-admin.png",
        width: 1080,
        height: 1080,
        alt: "MESS ADMIN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MESS ADMIN",
    images: ["/og-admin.png"],
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
