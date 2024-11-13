'use client';

import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useCard } from '@/context/CardContext';
import Card from '@/components/Card';
import { TaskType } from '@task-master/shared/types';
import useFetchData from '@/app/_hooks/useFetchData';
import { TASK_API, updateTask } from '@/app/_api/task';

export default function CardGroupModal() {
  const {
    data: cardList,
    error,
    isLoading,
  } = useFetchData<TaskType[]>(TASK_API.getAllTask());
  const { isCardGroupModalOpen, setIsCardGroupModalOpen, cardModalStatus } =
    useCard();
  const [selectedCardList, setSelectedCardList] = useState<TaskType[]>([]);

  const handleToggleSelect = (card: TaskType) => {
    setSelectedCardList((prev) => {
      if (prev.includes(card)) {
        return prev.filter((c) => c.id !== card.id);
      }
      return [...prev, card];
    });
  };

  const handleClose = () => {
    setIsCardGroupModalOpen(false);
    clearSelectedCardList();
  };

  const handleAdd = async () => {
    try {
      await Promise.all(
        selectedCardList.map(async (card) => {
          await updateTask(card.id, {
            ...card,
            inboard: true,
            status: cardModalStatus,
          });
        })
      );
      setIsCardGroupModalOpen(false);
      clearSelectedCardList();
    } catch (error) {
      console.log('error', error);
    }
  };

  const clearSelectedCardList = () => {
    setSelectedCardList([]);
  };

  return (
    <Modal
      size="5xl"
      scrollBehavior="inside"
      isOpen={isCardGroupModalOpen}
      onOpenChange={setIsCardGroupModalOpen}
      className="container max-h-[80vh] h-full"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Card Group</ModalHeader>
          <ModalBody>
            <div
              className="grid gap-4 justify-start justify-items-center"
              style={{ gridTemplateColumns: 'repeat(auto-fit, 200px)' }}
            >
              {(cardList ?? []).map((item) => (
                <Card
                  key={item.id}
                  card={item}
                  isPressable
                  selected={selectedCardList.includes(item)}
                  onPress={() => handleToggleSelect(item)}
                />
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="bordered" onPress={handleClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleAdd}>
              Add
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
