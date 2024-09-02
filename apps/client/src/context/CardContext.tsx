'use client';
import { createContext, useContext, useState } from 'react';

export const CardContext = createContext({
  isCardGroupModalOpen: false,
  setIsCardGroupModalOpen: (value: boolean) => {
    // This is intentionally left empty
  },
});

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCardGroupModalOpen, setIsCardGroupModalOpen] = useState(false);

  return (
    <CardContext.Provider
      value={{ isCardGroupModalOpen, setIsCardGroupModalOpen }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => useContext(CardContext);
