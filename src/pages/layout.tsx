import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from 'clsx';
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx([inter.className, "m-auto border border-red-600"])}>{children}</body>
    </html>
  );
}
