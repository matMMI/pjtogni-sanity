import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        <link
          rel="icon"
          href="icons/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="icons/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/icons/icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/icons/icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/icons/icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/icons/icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icons/icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/icon-180x180.png"
        />

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
