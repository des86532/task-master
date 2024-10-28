'use client';
import { createContext, useContext, useState } from 'react';
import { TaskType } from '@task-master/shared/types';

interface CardContextType {
  isCardGroupModalOpen: boolean;
  setIsCardGroupModalOpen: (value: boolean) => void;
  isCardModalOpen: boolean;
  setIsCardModalOpen: (value: boolean) => void;
  activeCard: TaskType | null;
  setActiveCard: (value: TaskType | null) => void;
  isNewCardModalOpen: boolean;
  setIsNewCardModalOpen: (value: boolean) => void;
}

export const CardContext = createContext<CardContextType>({
  isCardGroupModalOpen: false,
  setIsCardGroupModalOpen: (value: boolean) => {
    // This is intentionally left empty
  },
  isCardModalOpen: false,
  setIsCardModalOpen: (value: boolean) => {
    // This is intentionally left empty
  },
  activeCard: null,
  setActiveCard: (value: TaskType | null) => {
    // This is intentionally left empty
  },
  isNewCardModalOpen: false,
  setIsNewCardModalOpen: (value: boolean) => {
    // This is intentionally left empty
  },
});

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCardGroupModalOpen, setIsCardGroupModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<TaskType | null>(null);
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);

  return (
    <CardContext.Provider
      value={{
        isCardGroupModalOpen,
        setIsCardGroupModalOpen,
        isCardModalOpen,
        setIsCardModalOpen,
        activeCard,
        setActiveCard,
        isNewCardModalOpen,
        setIsNewCardModalOpen,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => useContext(CardContext);
