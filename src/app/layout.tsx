import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heavy Hire Australia | Equipment Hire Directory",
  description: "Find and compare equipment hire services across Australia",
  metadataBase: new URL('https://heavyhireaustralia.com'),
  openGraph: {
    title: 'Heavy Hire Australia',
    description: 'Find and compare equipment hire services across Australia',
    url: 'https://heavyhireaustralia.com',
    siteName: 'Heavy Hire Australia',
    locale: 'en_AU',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5075448607477357"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
