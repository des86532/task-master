'use client';

import './global.css';
import { NextUIProvider } from '@nextui-org/react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { CardProvider } from '@/context/CardContext';
import CardGroupModal from '@/components/CardGroupModal';
import CardModal from '@/components/CardModal';
import NewCardModal from '@/components/NewCardModal';
import FloatingIcons from '@/components/FloatingIcons';

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
              <div className="flex-1 w-full">
                <div className="mx-auto max-w-[1320px] h-full">{children}</div>
              </div>
              <Footer />
              <CardGroupModal />
              <CardModal />
              <NewCardModal />
              <FloatingIcons />
            </div>
          </CardProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
