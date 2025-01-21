import '@/styles/global.css'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/context/ToastContext'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project Manager',
  description: 'Gestor de proyectos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
