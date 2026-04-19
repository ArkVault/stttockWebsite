import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, IBM_Plex_Sans, Afacad, Space_Grotesk, Outfit } from 'next/font/google'
import { Courier_Prime } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _courierPrime = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"] });
const _ibmPlexSans = IBM_Plex_Sans({ weight: ["300", "400", "500", "600"], subsets: ["latin"] });
const afacad = Afacad({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-afacad" });
const spaceGrotesk = Space_Grotesk({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"], variable: "--font-display" });
const senseFont = localFont({
  src: "../public/fonts/SenseFont-Regular.ttf",
  variable: "--font-sense",
  display: "swap",
});
const outfit = Outfit({ weight: ["100", "300", "400", "500", "600", "700"], subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: 'Stttock — Gestión inteligente para bares y restaurantes',
  description: 'Control de inventario, POS, reservas y proyecciones inteligentes en un solo lugar. Diseñado para bares y restaurantes en México.',
  keywords: ['inventario restaurante', 'POS bar', 'reservaciones', 'gestión restaurante', 'software bar México'],
  authors: [{ name: 'Stttock' }],
  openGraph: {
    title: 'Stttock — Gestión inteligente para bares y restaurantes',
    description: 'Control de inventario, POS, reservas y proyecciones inteligentes en un solo lugar.',
    type: 'website',
    url: 'https://stttock.com',
    siteName: 'Stttock',
    images: [
      {
        url: 'https://stttock.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Stttock — Gestión inteligente para bares y restaurantes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stttock — Gestión inteligente para bares y restaurantes',
    description: 'Control de inventario, POS, reservas y proyecciones inteligentes en un solo lugar.',
    images: ['https://stttock.com/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-MX" className={`${afacad.variable} ${spaceGrotesk.variable} ${senseFont.variable} ${outfit.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
