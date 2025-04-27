'use client';

import './global.css';
import { HeroUIProvider } from '@heroui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Sidebar from '@/components/Sidebar';
import { AppProvideer } from '@/context/AppContext';
import { CardProvider } from '@/context/CardContext';
import CardGroupModal from '@/components/CardGroupModal';
import CardModal from '@/components/CardModal';
import CardManagementModal from '@/components/CardManagementModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}
        >
          <HeroUIProvider>
            <AppProvideer>
              <CardProvider>
                <div className="flex flex-col h-screen bg-custom p-8">
                  <div className="flex flex-1 mx-auto max-w-[1440px] w-full p-8 bg-white rounded-2xl gap-8 overflow-auto">
                    <Sidebar />
                    <div className="overflow-auto flex-1 w-full scrollbar-hide">
                      {children}
                    </div>
                  </div>

                  <CardGroupModal />
                  <CardModal />
                  <CardManagementModal />
                </div>
              </CardProvider>
            </AppProvideer>
          </HeroUIProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
