import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "../globals.css";

// TODO: implement dark theme, 
// reduce vertical width of navbar on mobile, 
// update list of servies on consultation form, 
// prefered mode of contact on consultation form
// change agents to affiliate
// authentication code to create a user account
// send pdf to email after clicking on property card
// implement careers page functionality
// implement development badge at the top right corner of new development card to show development status
// look into google api key for maps
// modify sell page layout, put image and text above, side-by-side.
// add terms and conditions for selling a property below the form.
// add carousel of pictures on the home page, and add upload feature to dashboard. protect the pictures from being downloaded by right clicking on them.
// add saadiyat video to buy page hero section
// add team section in about page.
// add brand ambassador section on home page, and another section for press
// add a section for social media posts on the home page.
// complete by 7th July

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Wephco - Buy, Sell Luxury Homes",
  description: "Your Gateway to Prime Global Real Estate",
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
        <ToastContainer />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
