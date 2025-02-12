import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://heavyhireaustralia.com'),
  title: {
    default: "Heavy Hire Australia | Equipment Hire Directory",
    template: "%s | Heavy Hire Australia"
  },
  description: "Find and compare equipment hire services across Australia",
  openGraph: {
    title: 'Heavy Hire Australia',
    description: 'Find and compare equipment hire services across Australia',
    url: 'https://heavyhireaustralia.com',
    siteName: 'Heavy Hire Australia',
    locale: 'en_AU',
    type: 'website',
  },
  other: {
    'google-adsense-account': 'ca-pub-5075448607477357',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
      {
        rel: 'android-chrome',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5075448607477357"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body>
        {children}
      </body>
    </html>
  );
}
