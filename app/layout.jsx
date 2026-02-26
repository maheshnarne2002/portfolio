import './globals.css'
import { Syne } from 'next/font/google'
import { DM_Sans } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata = {
  title: 'Mahesh Babu Narne — Senior Software Engineer',
  description: 'Senior Software Engineer at Apple. Expert in Java, Spring Boot, Python, React, and Cloud-Native Architecture. 4+ years building scalable distributed systems.',
  keywords: 'software engineer, Java, React, Spring Boot, Apple, full-stack, cloud',
  openGraph: {
    title: 'Mahesh Babu Narne — Senior Software Engineer',
    description: 'Senior Software Engineer at Apple specializing in scalable distributed systems.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
      </head>
      <body className="font-sans antialiased grain">
        {children}
      </body>
    </html>
  )
}