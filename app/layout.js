import "./globals.css";

import { ClientEffects } from "@/components/client-effects";
import { PageMotion } from "@/components/page-motion";
import { ThemeScript } from "@/components/theme-script";
import { getAbsoluteUrl, getSiteMetadata, profile } from "@/lib/site-config";

const site = getSiteMetadata();

export const metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.title} | ${site.tagline}`,
    template: `%s | ${site.title}`
  },
  description: site.description,
  keywords: site.keywords,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": getAbsoluteUrl("/feed.xml")
    }
  },
  openGraph: {
    title: `${site.title} | ${site.tagline}`,
    description: site.description,
    url: site.siteUrl,
    siteName: site.title,
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.title} | ${site.tagline}`,
    description: site.description
  },
  category: "technology"
};

export default function RootLayout({ children }) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.title,
    url: site.siteUrl,
    description: site.description,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: profile.name
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <ClientEffects />
        <PageMotion />
        {children}
      </body>
    </html>
  );
}
