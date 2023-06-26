'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import ReduxProvider from '@/store/redux-provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-white h-screen">
          <title>NDUUSA 2023 Election</title>
          <main className="container mx-auto h-full p-2">
            <ReduxProvider>{children}</ReduxProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
