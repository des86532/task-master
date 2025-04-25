'use client';
import { createContext, useContext, useState } from 'react';
import { TaskType } from '@task-master/shared';
import useFetchData from '@/app/_hooks/useFetchData';
import { TASK_API, deleteTask } from '@/app/_api/task';

interface CardContextType {
  defaultExpiredDate: Date;
  setDefaultExpiredDate: (value: Date) => void;
  isCardGroupModalOpen: boolean;
  setIsCardGroupModalOpen: (value: boolean) => void;
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
  handleOpenCardModal: (cardId: number) => void;
  handleOpenNewCardModal: (date: Date) => void;
  handleOpenEditCardModal: (card: TaskType | null) => void;
  handleDeleteCard: (card: TaskType | null) => void;
}

export const CardContext = createContext<CardContextType>({
  defaultExpiredDate: new Date(),
  setDefaultExpiredDate: () => {
    throw new Error('setDefaultExpiredDate function must be overridden');
  },
  isCardGroupModalOpen: false,
  setIsCardGroupModalOpen: () => {
    throw new Error('setIsCardGroupModalOpen function must be overridden');
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
  handleOpenCardModal: () => {
    throw new Error('handleOpenCardModal function must be overridden');
  },
  handleOpenNewCardModal: () => {
    throw new Error('handleOpenNewCardModal function must be overridden');
  },
  handleOpenEditCardModal: () => {
    throw new Error('handleOpenEditCardModal function must be overridden');
  },
  handleDeleteCard: () => {
    throw new Error('handleDeleteCard function must be overridden');
  },
});

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [defaultExpiredDate, setDefaultExpiredDate] = useState(new Date());
  const [isCardGroupModalOpen, setIsCardGroupModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<TaskType | null>(null);
  const [isCardManagementModalOpen, setIsCardManagementModalOpen] =
    useState(false);
  const {
    data: cardList,
    error: cardError,
    isLoading: cardLoading,
    mutate: updateCards,
  } = useFetchData<TaskType[]>(TASK_API.allTask);

  const handleOpenCardModal = (cardId: number) => {
    const card = cardList?.find((item) => item.id === cardId);
    if (!card) return;

    setActiveCard(card);
    setIsCardModalOpen(true);
  };

  const handleOpenNewCardModal = (date: Date) => {
    if (isCardManagementModalOpen) return;

    setDefaultExpiredDate(date);
    setActiveCard(null);
    setIsCardManagementModalOpen(true);
  };

  const handleOpenEditCardModal = (card: TaskType | null) => {
    if (!card || isCardManagementModalOpen) return;

    setActiveCard(card);
    setIsCardManagementModalOpen(true);
  };

  const handleDeleteCard = async (card: TaskType | null) => {
    if (!card) return;

    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteTask(card.id);
        alert(`刪除卡片 card: ${card.title}`);
        updateCards();
        setIsCardModalOpen(false);
      } catch (error) {
        alert('刪除卡片失敗');
      }
    }
  };

  return (
    <CardContext.Provider
      value={{
        defaultExpiredDate,
        setDefaultExpiredDate,
        isCardGroupModalOpen,
        setIsCardGroupModalOpen,
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
        handleOpenCardModal,
        handleOpenNewCardModal,
        handleOpenEditCardModal,
        handleDeleteCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => useContext(CardContext);
