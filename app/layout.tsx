import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cosmic Astrology - Your Personal Spiritual Guide",
  description:
    "Discover your cosmic blueprint through personalized astrology, spiritual assessments, and AI-powered guidance. Explore your archetype, spiritual gifts, and life purpose.",
  keywords:
    "astrology, spiritual guidance, archetype assessment, horoscope, AI spiritual guide, personal insights, cosmic wisdom",
  authors: [{ name: "Cosmic Astrology" }],
  creator: "Cosmic Astrology",
  publisher: "Cosmic Astrology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cosmic-astrology.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cosmic Astrology - Your Personal Spiritual Guide",
    description:
      "Discover your cosmic blueprint through personalized astrology, spiritual assessments, and AI-powered guidance.",
    url: "https://cosmic-astrology.vercel.app",
    siteName: "Cosmic Astrology",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cosmic Astrology - Personal Spiritual Guidance",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmic Astrology - Your Personal Spiritual Guide",
    description:
      "Discover your cosmic blueprint through personalized astrology, spiritual assessments, and AI-powered guidance.",
    images: ["/og-image.jpg"],
    creator: "@cosmicAstrology",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://api.deepseek.com" />
        <link rel="preconnect" href="https://horoscop-app-api.vercel.app" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Cosmic Astrology",
              description: "Personal spiritual guidance through astrology and AI-powered insights",
              url: "https://cosmic-astrology.vercel.app",
              applicationCategory: "LifestyleApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "Cosmic Astrology",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50`}
      >
        <div className="relative">
          {/* Main content */}
          <div className="relative z-10">{children}</div>

          {/* Accessibility skip link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-lg z-50"
          >
            Skip to main content
          </a>
        </div>

        {/* Service Worker Registration for PWA capabilities */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />

        {/* Error boundary for unhandled errors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                console.error('Global error caught:', e.error);
              });
              
              window.addEventListener('unhandledrejection', function(e) {
                console.error('Unhandled promise rejection:', e.reason);
                e.preventDefault();
              });
            `,
          }}
        />
</body>
    </html>
  )
}
