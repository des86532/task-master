import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/react';
import { useCard } from '@/context/CardContext';
import { useEffect, useState } from 'react';

export default function CardModal() {
  const {
    isCardModalOpen,
    setIsCardModalOpen,
    activeCard,
    setActiveCard,
    handleOpenEditCardModal,
    handleDeleteCard,
  } = useCard();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onOpenChange = () => {
    setIsCardModalOpen(!isCardModalOpen);
  };

  const handleCardDelete = async () => {
    try {
      setIsSubmitting(true);
      await handleDeleteCard(activeCard);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the task.');
    } finally {
      setIsSubmitting(false);
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
      onClose={() => setActiveCard(null)}
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
              <Button
                color="danger"
                variant="light"
                onPress={handleCardDelete}
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
              >
                Delete
              </Button>
              <Button
                color="primary"
                onPress={() => handleOpenEditCardModal(activeCard)}
              >
                Edit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
