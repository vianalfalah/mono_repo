import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { IDELayout } from '@mono/ui'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description: 'Admin dashboard with analytics and data visualization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <IDELayout appName="Dashboard" activePath="/dashboard">
          {children}
        </IDELayout>
      </body>
    </html>
  )
}
