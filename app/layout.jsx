// app/layout.js
"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground transition-colors duration-300`}>
        
        {/* NAVBAR */}
        <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-black/10 border-b border-white/10">
          <div className="max-w-5xl mx-auto flex justify-between items-center py-4 px-6">
            <Link href="/" className="text-xl font-semibold hover:opacity-80 transition">
              Mahesh
            </Link>

            <div className="flex items-center gap-6">
              <Link href="#skills" className="hover:text-blue-400 transition">Skills</Link>
              <Link href="#experience" className="hover:text-blue-400 transition">Experience</Link>
              <Link href="#about" className="hover:text-blue-400 transition">About</Link>
              <Link href="#contact" className="hover:text-blue-400 transition">Contact</Link>

              {/* THEME TOGGLE */}
              <button
                onClick={() => document.documentElement.classList.toggle("dark")}
                className="p-2 rounded-md border border-white/20 hover:bg-white/10 transition"
              >
                🌙
              </button>
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="pt-24">{children}</main>

        {/* FOOTER */}
        <footer className="mt-20 py-10 text-center border-t border-white/10">
          <p className="opacity-70">© 2026 Mahesh Babu Narne</p>
          <p className="opacity-50 text-sm mt-2">Designed & Built with Next.js + TailwindCSS</p>
        </footer>

      </body>
    </html>
  );
}

