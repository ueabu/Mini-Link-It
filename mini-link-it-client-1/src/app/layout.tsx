import type { Metadata } from "next";

import { Inter } from 'next/font/google';

import "./globals.css";


const manufacturingConsent = Inter({
  weight: ["300", "400", "500", "700"],
  variable: "--font-manufacturing-consent",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini-Link-It",
  description: "A Simple URL Shortner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manufacturingConsent.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
