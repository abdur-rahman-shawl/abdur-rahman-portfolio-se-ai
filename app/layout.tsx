import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import { LoaderProvider } from '@/components/LoaderContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Abdur Rahman | GenAI Engineer',
  description: 'Portfolio of Abdur Rahman, Software Engineer - GenAI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="bg-[#050505] text-[#f5f5f5] selection:bg-[#f5f5f5] selection:text-[#050505]">
        <LoaderProvider>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            {children}
          </SmoothScroll>
        </LoaderProvider>
      </body>
    </html>
  );
}
