'use client';

import Navbar from './Navbar';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen gradient-bg dark:bg-dark text-white">
      <Navbar />
      <main className="pt-16">{children}</main>
    </div>
  );
}
