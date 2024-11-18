'use client';
import { createContext, useContext, useState } from 'react';
import { TaskType, TaskStatus } from '@task-master/shared/types';
import useFetchData from '@/app/_hooks/useFetchData';
import { TASK_API } from '@/app/_api/task';

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
  cardList: TaskType[] | undefined;
  cardError: Error | undefined;
  cardLoading: boolean;
  updateCard: () => void;
}

export const CardContext = createContext<CardContextType>({
  isCardGroupModalOpen: false,
  setIsCardGroupModalOpen: () => {
    throw new Error('setIsCardGroupModalOpen function must be overridden');
  },
  cardModalStatus: TaskStatus.TODO,
  setCardModalStatus: () => {
    throw new Error('setCardModalStatus function must be overridden');
  },
  isCardModalOpen: false,
  setIsCardModalOpen: () => {
    throw new Error('setIsCardModalOpen function must be overridden');
  },
  activeCard: null,
  setActiveCard: () => {
    throw new Error('setActiveCard function must be overridden');
  },
  isNewCardModalOpen: false,
  setIsNewCardModalOpen: () => {
    throw new Error('setIsNewCardModalOpen function must be overridden');
  },
  cardList: [],
  cardError: undefined,
  cardLoading: false,
  updateCard: () => {
    throw new Error('updateCard function must be overridden');
  },
});

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCardGroupModalOpen, setIsCardGroupModalOpen] = useState(false);
  const [cardModalStatus, setCardModalStatus] = useState(TaskStatus.TODO);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<TaskType | null>(null);
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);
  const {
    data: cardList,
    error: cardError,
    isLoading: cardLoading,
    mutate: updateCard,
  } = useFetchData<TaskType[]>(TASK_API.allTask());

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
        cardList,
        cardError,
        cardLoading,
        updateCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => useContext(CardContext);
