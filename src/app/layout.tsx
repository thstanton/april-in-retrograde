import type { Metadata } from "next";
import { Paytone_One, Quicksand } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import SessionProvider from "./SessionProvider";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});

const paytoneOne = Paytone_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-paytone-one",
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
    <html lang="en" className={`${quicksand.variable} ${paytoneOne.variable}`}>
      <body className="bg-amber-50">
        <SessionProvider>
          <NavBar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
