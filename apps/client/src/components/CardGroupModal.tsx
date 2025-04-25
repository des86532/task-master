'use client';

import { useState } from 'react';
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
import { TASK_API } from '@/app/_api/task';
import useFetchData from '@/app/_hooks/useFetchData';

export default function CardGroupModal() {
  const { isCardGroupModalOpen, setIsCardGroupModalOpen } = useCard();
  const [selectedCardList, setSelectedCardList] = useState<TaskType[]>([]);
  const { data: cardList } = useFetchData<TaskType[]>(TASK_API.allTask);

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
    console.log('handleAdd');
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
            {cardList?.length === 0 && (
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
