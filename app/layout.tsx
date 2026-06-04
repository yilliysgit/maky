// @/app/layout.tsx

import localFont from "next/font/local"
import SmoothScroll from "@/components/providers/SmoothScroll"

import "./globals.css"

const suisse = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    {
      path: "../fonts/SuisseIntl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SuisseIntl-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/SuisseIntl-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/SuisseIntl-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={suisse.variable}>
      <body className="bg-black text-white antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
};