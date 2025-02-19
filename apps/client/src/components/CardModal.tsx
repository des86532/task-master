import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import { useCard } from '@/context/CardContext';
import { useEffect } from 'react';
import { deleteTask } from '@/app/_api/task';

export default function CardModal() {
  const {
    isCardModalOpen,
    setIsCardModalOpen,
    activeCard,
    setActiveCard,
    setIsCardManagementModalOpen,
    updateCards,
  } = useCard();

  const onOpenChange = () => {
    setIsCardModalOpen(!isCardModalOpen);
  };

  const handleModalClose = () => {
    setActiveCard(null);
  };

  const handleCardEdit = () => {
    setIsCardManagementModalOpen(true);
  };

  const handleCardDelete = async () => {
    if (!activeCard) return;

    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteTask(activeCard.id);
        alert('刪除卡片成功');
        updateCards();
      } catch (error) {
        alert('刪除卡片失敗');
      }
    }
  };

  useEffect(() => {
    if (!isCardModalOpen) return;
  }, [isCardModalOpen]);

  return (
    <Modal
      isOpen={isCardModalOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
      onClose={handleModalClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {activeCard ? activeCard.title : 'No card selected'}
            </ModalHeader>
            <ModalBody>
              <p>{activeCard ? activeCard.description : 'No card selected'}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleCardDelete}>
                Delete
              </Button>
              <Button color="primary" onPress={handleCardEdit}>
                Edit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
