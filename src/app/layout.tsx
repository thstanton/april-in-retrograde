import type { Metadata } from "next";
import { Inter, Paytone_One, Quicksand } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

const paytoneOne = Paytone_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-paytone-one"
});

export const metadata: Metadata = {
  title: "Project April",
  description: "Come dine with us!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${quicksand.variable} ${paytoneOne}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
