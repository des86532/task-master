'use client';

import { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';

export const AppContext = createContext<{
  isMobile: boolean;
}>({
  isMobile: false,
});

export const AppProvideer = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // 初始化狀態
    window.addEventListener('resize', handleResize); // 監聽窗口大小變化

    return () => {
      window.removeEventListener('resize', handleResize); // 清理事件監聽器
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        isMobile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
