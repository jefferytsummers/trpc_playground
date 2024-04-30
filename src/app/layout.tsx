import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from 'clsx';
import React from "react";
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Save the date!',
  description: 'Interactive itineraries!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx([inter.className, "h-screen w-screen text-neutral-content bg-neutral"])}>{children}</body>
    </html>
  );
}
