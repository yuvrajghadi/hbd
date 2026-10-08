import type { Metadata } from 'next';
import { Playfair_Display, Caveat, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-cursive',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Happy Birthday, My Yedu 💙 | My Favorite Girl',
  description: 'A special, romantic, and magical birthday surprise made with all my love for my Yedu.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💙</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${caveat.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#EBF7FD] text-[#020D33] font-sans antialiased selection:bg-[#A0E9FF] selection:text-[#020D33] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
