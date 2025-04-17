import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import "../globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const roboto = Roboto({
//   variable: "--font-roboto",
//   subsets: ["latin"],
// })

// const poppins = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   display: "swap",
// })

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Wephco - Buy, Sell Luxury Homes",
  description: "Affordable Properties in Dubai & Abuja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
