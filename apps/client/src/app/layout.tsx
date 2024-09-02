'use client';

import './global.css';
import { NextUIProvider } from '@nextui-org/react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { CardProvider } from '@/context/CardContext';
import CardGroupModal from '@/components/CardGroupModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <CardProvider>
            <div className="flex flex-col h-screen">
              <Sidebar />
              <div className="container flex-1 mx-auto">{children}</div>
              <Footer></Footer>
              <CardGroupModal />
            </div>
          </CardProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
