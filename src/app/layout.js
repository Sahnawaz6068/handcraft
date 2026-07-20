import { Fraunces, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Orna — Fine jewelry from independent makers",
  description:
    "Shop rings, chains, and gemstones from verified independent jewellers. Every piece hallmarked, every maker traceable.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <body>
        <Navbar/>
        {children}
        <Footer/>
        </body>
        
    </html>
  );
}