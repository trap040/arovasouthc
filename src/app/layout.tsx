// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";  
import Footer from "../components/Footer";  
import ClientAuthProvider from "../components/ClientAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arova Hotel & Restaurant",
  description: "This is the official website for Arova Hotel and Restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black flex flex-col min-h-screen`}
      >
        <ClientAuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ClientAuthProvider>
      </body>
    </html>
  );
}