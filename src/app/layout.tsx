import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, DM_Serif_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { DemoThemeProvider } from "@/context/DemoThemeContext";
import { LiveSimulationProvider } from "@/context/LiveSimulationContext";
import { ToastProvider } from "@/context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Marketing page fonts
const dmSerif = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IntelliOps AI - Where Operations Become Intelligent",
  description: "IntelliOps AI: Where Operations Become Intelligent. AI-driven operational intelligence across delivery, operations, and enterprise layers — with conservative, tier-based ROI.",
  keywords: [
    "AI health monitoring",
    "banking operations",
    "incident prediction", 
    "enterprise dashboard",
    "cost savings",
    "ROI calculator",
    "system monitoring",
    "predictive analytics"
  ],
  authors: [{ name: "Rahuul Pande" }],
  creator: "Rahuul Pande",
  publisher: "IntelliOps AI",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "IntelliOps AI",
    title: "IntelliOps AI - Where Operations Become Intelligent",
    description: "Transform reactive IT operations into predictive intelligence. 97.2% system health, 50+ incidents prevented daily, 4,500+ banks can benefit.",
    url: "https://ai-ml-dashboard-5xslwqlur-rahuul-pandes-projects.vercel.app",
    images: [
      {
        url: "https://ai-ml-dashboard-5xslwqlur-rahuul-pandes-projects.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Health Monitor AI Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IntelliOps AI - Where Operations Become Intelligent",
    description: "IntelliOps AI: Where Operations Become Intelligent. Three intelligence layers, conservative ROI, 150+ services monitored.",
    images: ["https://ai-ml-dashboard-5xslwqlur-rahuul-pandes-projects.vercel.app/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/intelliops-logo.svg" />
        <link rel="apple-touch-icon" href="/images/intelliops-logo.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'),d=localStorage.getItem('demo-theme'),r=localStorage.getItem('intelliops_role');var m=(r==='admin')?(t||'light'):(d||'dark');document.documentElement.className=m}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased bg-white dark:bg-[#0F0F0F] text-gray-900 dark:text-gray-100`}
      >
        <AuthProvider>
          <DemoThemeProvider>
            <ToastProvider>
              <LiveSimulationProvider>
                {children}
              </LiveSimulationProvider>
            </ToastProvider>
          </DemoThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
// Cache bust updated for v4.0.0
