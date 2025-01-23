import '@/styles/global.css'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/context/ToastContext'
import { ToggleTheme } from '@/components/ToggleTheme';
import { Providers } from "./providers";

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
      <body className={`${inter.className} bg-white dark:bg-black transition-colors duration-300`}>
        <ToastProvider>
          <Providers>
          <ToggleTheme />
          {children}
          </Providers>
        </ToastProvider>
      </body>
    </html>
  );
}
