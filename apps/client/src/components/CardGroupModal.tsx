'use client';

import { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import { useCard } from '@/context/CardContext';
import Card from '@/components/Card';
import { TaskType } from '@task-master/shared';
import { getAllTask, patchManyTask } from '@/app/_api/task';

export default function CardGroupModal() {
  const [cardList, setCardList] = useState<TaskType[]>([]);
  const {
    isCardGroupModalOpen,
    setIsCardGroupModalOpen,
    cardModalStatus,
    updateCard,
  } = useCard();
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
      await patchManyTask(
        selectedCardList.map((item) => item.id),
        { status: cardModalStatus }
      );
      updateCard();
      setIsCardGroupModalOpen(false);
      clearSelectedCardList();
    } catch (error) {
      console.log('error', error);
    }
  };

  const clearSelectedCardList = () => {
    setSelectedCardList([]);
  };

  const fetchData = async () => {
    try {
      const response = await getAllTask({ status: 'pending' });
      setCardList(response);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    if (isCardGroupModalOpen) {
      fetchData();
    }
  }, [isCardGroupModalOpen]);

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
            {cardList.length === 0 && (
              <div className="flex justify-center items-center h-full">
                No card found
              </div>
            )}
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
