'use client';
import { createContext, useContext, useState } from 'react';
import { TaskType, TaskStatus } from '@task-master/shared/types';

interface CardContextType {
  isCardGroupModalOpen: boolean;
  setIsCardGroupModalOpen: (value: boolean) => void;
  cardModalStatus: TaskStatus;
  setCardModalStatus: (value: TaskStatus) => void;
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
  cardModalStatus: TaskStatus.TODO,
  setCardModalStatus: (value: TaskStatus) => {
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
  const [cardModalStatus, setCardModalStatus] = useState(TaskStatus.TODO);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<TaskType | null>(null);
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);

  return (
    <CardContext.Provider
      value={{
        isCardGroupModalOpen,
        setIsCardGroupModalOpen,
        cardModalStatus,
        setCardModalStatus,
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
