import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { IBM_Plex_Sans, IBM_Plex_Mono, Newsreader } from 'next/font/google'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata = {
  title: 'Mahesh Babu Narne | Software Engineer',
  description:
    'Software engineer building fast, observable distributed systems — Java, Spring Boot, React, and cloud-native architectures.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${newsreader.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}