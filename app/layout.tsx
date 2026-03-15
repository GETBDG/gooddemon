import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CatalogProvider } from "@/components/providers/catalog-provider";
import { StoreProvider } from "@/components/providers/store-provider";
import { CartDrawer } from "@/components/cart-drawer";
import { siteConfig } from "@/content/site";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"]
});

const sans = Syne({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"]
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gooddemon.example"),
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: "/gooddemon-logo.png",
    shortcut: "/gooddemon-logo.png",
    apple: "/gooddemon-logo.png"
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans text-bone antialiased">
        <CatalogProvider>
          <StoreProvider>
            <div className="relative overflow-x-hidden">
              <Header />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
            </div>
          </StoreProvider>
        </CatalogProvider>
      </body>
    </html>
  );
}
