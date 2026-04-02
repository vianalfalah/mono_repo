import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { IDELayout } from '@mono/ui'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Projects Hub',
  description: 'A collection of my web projects and experiments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <IDELayout appName="Home" activePath="/">
          {children}
        </IDELayout>
      </body>
    </html>
  )
}
