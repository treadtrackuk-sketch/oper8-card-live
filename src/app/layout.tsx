import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OPER8 OS | Will McDougall",
  description: "Premium NFC digital business card for Will McDougall, Founder of OPER8 OS powered by TyreTag Ltd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
