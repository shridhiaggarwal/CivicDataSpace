import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civic Data Space",
  description: "Civic Data Space created by Shridhi Aggarwal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Breadcrumb />
        <main className="min-h-screen bg-gray-50">{children}</main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
