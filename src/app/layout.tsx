// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Configuration des polices locales
const hankenGroteskBlack = localFont({
  src: "../../public/fonts/HankenGrotesk-Black.ttf",
  variable: "--font-hanken-black",
});

const hankenGroteskRegular = localFont({
  src: "../../public/fonts/HankenGrotesk-Regular.ttf",
  variable: "--font-hanken-regular",
});

const hankenGroteskLight = localFont({
  src: "../../public/fonts/HankenGrotesk-Light.ttf",
  variable: "--font-hanken-light",
});

export const metadata: Metadata = {
  title: "Pierre-Jean TOGNI",
  description: "Portfolio de Pierre-Jean TOGNI, Infographiste",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${hankenGroteskBlack.variable} ${hankenGroteskRegular.variable} ${hankenGroteskLight.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/icon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/icon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-regular">
        <div className="flex h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 h-screen overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
