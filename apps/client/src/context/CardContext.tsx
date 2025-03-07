'use client';
import { createContext, useContext, useState } from 'react';
import { TaskType, TaskStatus } from '@task-master/shared';
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
  isCardManagementModalOpen: boolean;
  setIsCardManagementModalOpen: (value: boolean) => void;
  cardList: TaskType[] | undefined;
  cardError: Error | undefined;
  cardLoading: boolean;
  updateCards: () => void;
}

export const CardContext = createContext<CardContextType>({
  isCardGroupModalOpen: false,
  setIsCardGroupModalOpen: () => {
    throw new Error('setIsCardGroupModalOpen function must be overridden');
  },
  cardModalStatus: TaskStatus.PENDING,
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
  isCardManagementModalOpen: false,
  setIsCardManagementModalOpen: () => {
    throw new Error('setIsCardManagementModalOpen function must be overridden');
  },
  cardList: [],
  cardError: undefined,
  cardLoading: false,
  updateCards: () => {
    throw new Error('updateCards function must be overridden');
  },
});

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCardGroupModalOpen, setIsCardGroupModalOpen] = useState(false);
  const [cardModalStatus, setCardModalStatus] = useState(TaskStatus.TODO);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<TaskType | null>(null);
  const [isCardManagementModalOpen, setIsCardManagementModalOpen] =
    useState(false);
  const {
    data: cardList,
    error: cardError,
    isLoading: cardLoading,
    mutate: updateCards,
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
        isCardManagementModalOpen,
        setIsCardManagementModalOpen,
        cardList,
        cardError,
        cardLoading,
        updateCards,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => useContext(CardContext);
