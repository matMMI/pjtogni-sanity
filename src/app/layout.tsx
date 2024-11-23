// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const titleFont = localFont({
  src: "../../public/fonts/HankenGrotesk-Black.ttf",
  variable: "--font-title",
});

const textFont = localFont({
  src: "../../public/fonts/HankenGrotesk-Light.ttf",
  variable: "--font-text",
});

export const metadata: Metadata = {
  title: "Mon App",
  description: "Description de mon app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${titleFont.variable} ${textFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
