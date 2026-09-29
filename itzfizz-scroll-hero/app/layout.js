import { Syncopate, Inter } from "next/font/google";
import "./globals.css";

const display = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Welcome Itzfizz | Scroll Hero",
  description: "Scroll-driven hero section built with Next.js, Tailwind and GSAP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ink font-body">{children}</body>
    </html>
  );
}
