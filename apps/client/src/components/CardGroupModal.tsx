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
import { cardListData } from '@/app/_mock/cardList';
import { TaskType } from '@task-master/shared/types';

export default function CardGroupModal() {
  const { isCardGroupModalOpen, setIsCardGroupModalOpen } = useCard();
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

  const handleAdd = () => {
    setIsCardGroupModalOpen(false);
    clearSelectedCardList();
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
      className="container max-h-[80vh]"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Card Group</ModalHeader>
          <ModalBody>
            <div
              className="grid gap-4 justify-between justify-items-center"
              style={{ gridTemplateColumns: 'repeat(auto-fit, 200px)' }}
            >
              {cardListData.map((item) => (
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
