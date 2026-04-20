import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'PawSphere — Smart Animal Rescue Platform for Bangladesh',
  description: 'AI-powered community-driven animal rescue, adoption, and care platform for Bangladesh.',
  keywords: 'animal rescue, pet adoption, veterinary, Bangladesh, PawSphere',
  openGraph: {
    title: 'PawSphere',
    description: 'Every paw deserves a safe sphere.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1A1D27',
                color: '#F1F5F9',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
