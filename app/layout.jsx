import './globals.css'
import { IBM_Plex_Sans, IBM_Plex_Mono, Lora } from 'next/font/google'

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

const serif = Lora({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata = {
  title: 'Mahesh Babu Narne | Senior Software Engineer',
  description:
    'Senior software engineer building scalable distributed backend systems — Java, Python, TypeScript, Kafka, and cloud-native architectures across communications and healthcare.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${serif.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  )
}