import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const banglaFont = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে দেখুন।",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="bn" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${banglaFont.variable}  min-h-full antialiased`}
      >
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
