import type { Metadata } from "next";
import { Caveat, Sora } from "next/font/google";
import { LenisProvider } from "@/components/client/LenisProvider";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600"],
});

import { navigationLinks } from "@/lib/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, "");

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: siteConfig.name,
    alternateName: ["Bhavarthe Ankit Budhaji", "Ankit Budhaji Bhavarthe"],
    url: baseUrl,
    image: `${baseUrl}/og-image.png`,
    sameAs: [
      siteConfig.github,
      siteConfig.linkedin,
      siteConfig.twitter,
    ],
    jobTitle: "Co-Founder & Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Kairos",
      description: "Digital agency delivering end-to-end full stack development and design solutions.",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Shivajirao S. Jondhale College of Engineering",
    },
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Tailwind CSS",
      "MongoDB",
      "Express.js",
      "Serverless Architecture",
      "TensorFlow.js",
      "OpenCV",
      "Computer Vision",
      "Face Recognition",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ulhasnagar",
      addressCountry: "IN",
    },
    email: siteConfig.email,
    description: siteConfig.description,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
  };

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Site Navigation",
    itemListElement: navigationLinks.map((link, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: link.name,
      url: link.url.startsWith("http")
        ? link.url
        : `${baseUrl}${link.url.startsWith("/") ? "" : "/"}${link.url}`,
      description: link.description,
    })),
  };

  return (
    <html
      lang="en"
      className={`${sora.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

