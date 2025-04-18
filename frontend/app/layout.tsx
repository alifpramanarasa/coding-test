import type React from "react"
import "../styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "../components/theme-provider"
import type { Metadata } from "next"
import { QueryProvider } from "../components/providers/query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sales Dashboard",
  description: "Sales dashboard with AI-powered insights",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
} 