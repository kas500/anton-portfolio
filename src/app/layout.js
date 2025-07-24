"use client"
import Link from 'next/link';
import './globals.css';
import { Raleway } from 'next/font/google';
import { Instagram, Mail, Menu } from 'lucide-react';
import { useState } from 'react';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false); // Burger state

  return (
    <html lang="en" className={raleway.className}>
      <body className="flex min-h-screen bg-white text-black">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col items-start p-6 fixed top-0 left-0 h-screen">
          <Link href="/" className="mb-3 text-2xl font-bold hover:text-gray-600 text-black">
            Anton Krasnikov
          </Link>

          {/* Icons row */}
          <div className="flex gap-4 mb-10 text-black">
            <a href="https://instagram.com/kaspicot" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 hover:text-gray-600" />
            </a>
            <a href="https://instagram.com/blindemptiness" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 hover:text-gray-600" />
            </a>
            <a href="mailto:krasnikovanton84@gmail.com">
              <Mail className="w-5 h-5 hover:text-gray-600" />
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-6 text-lg">
            <Link href="/bw" className="hover:text-gray-600 text-black">BW</Link>
            <Link href="/color" className="hover:text-gray-600 text-black">Color</Link>
            <Link href="/macro" className="hover:text-gray-600 text-black">Macro</Link>
            <Link href="/film" className="hover:text-gray-600 text-black">Film</Link>
          </nav>
        </aside>

        <header className="md:hidden fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white border-b border-gray-200 z-50">
          <Link href="/" className="text-lg font-bold text-black">
            Anton Krasnikov
          </Link>
          <button onClick={() => setOpen(!open)}>
            <Menu className="w-6 h-6 text-black" />
          </button>
        </header>

        {open && (
          <div className="md:hidden fixed top-14 left-0 w-full bg-white shadow-lg p-4 z-50 text-black">
            <nav className="flex flex-col gap-4 text-lg text-black">
              <Link href="/bw" onClick={() => setOpen(false)}>BW</Link>
              <Link href="/color" onClick={() => setOpen(false)}>Color</Link>
              <Link href="/macro" onClick={() => setOpen(false)}>Macro</Link>
              <Link href="/film" onClick={() => setOpen(false)}>Film</Link>
              <div className="flex gap-4 pt-4">
                <a href="https://instagram.com/kaspicot" target="_blank"><Instagram className="w-5 h-5" /></a>
                <a href="https://instagram.com/blindemptiness" target="_blank"><Instagram className="w-5 h-5" /></a>
                <a href="mailto:krasnikovanton84@gmail.com"><Mail className="w-5 h-5" /></a>
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 md:ml-64 min-h-screen p-8 bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
