import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from "@/components/navbar";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'COMFIRE',
    description: 'Website that alerts communities of wildfires in their area and provides a platform for members to respond to the fire.',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Navbar/>
        {children}
        </body>
        </html>
    )
}
