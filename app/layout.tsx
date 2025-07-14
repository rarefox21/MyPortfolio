import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Playfair_Display, Crimson_Text, Courier_Prime } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
})

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  display: "swap",
})

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Abrar Mubeen - Software Engineer & Full-Stack Developer",
  description:
    "Portfolio of Abrar Mubeen, a Software Engineering student at IUT with expertise in full-stack development, data science, and competitive programming.",
  keywords: "Abrar Mubeen, Software Engineer, Full-Stack Developer, React, Laravel, Django, Data Science, IUT",
  authors: [{ name: "Abrar Mubeen" }],
  openGraph: {
    title: "Abrar Mubeen - Software Engineer & Full-Stack Developer",
    description: "Portfolio showcasing projects in web development, data science, and competitive programming.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abrar Mubeen - Software Engineer & Full-Stack Developer",
    description: "Portfolio showcasing projects in web development, data science, and competitive programming.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${playfair.variable} ${crimson.variable} ${courier.variable}`}>
        {children}
      </body>
    </html>
  )
}
