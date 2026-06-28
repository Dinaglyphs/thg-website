import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TiltCards } from '@/components/TiltCards'
import { getNav } from '@/lib/nav'

export const metadata: Metadata = {
  title: {
    default: 'Treasure House of God · RCCG Hemel Hempstead',
    template: '%s · Treasure House of God',
  },
  description:
    'A warm, Bible-believing church family in Hemel Hempstead. Join us Sundays at 10am — everyone is welcome.',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const nav = await getNav()
  return (
    <html lang="en">
      <body>
        <Header items={nav.header} />
        <main>{children}</main>
        <Footer columns={nav.footer} />
        <TiltCards />
      </body>
    </html>
  )
}
