'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white">
      <h2 className="text-4xl font-serif mb-4">404 - Not Found</h2>
      <p className="text-white/70 mb-8">Could not find the requested resource</p>
      <Link href="/" className="border border-white/30 rounded-full px-8 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
        Return Home
      </Link>
    </div>
  );
}
