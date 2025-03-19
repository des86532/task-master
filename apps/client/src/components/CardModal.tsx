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

export default function CardModal() {
  const {
    isCardModalOpen,
    setIsCardModalOpen,
    activeCard,
    setActiveCard,
    handleOpenEditCardModal,
    handleDeleteCard,
  } = useCard();

  const onOpenChange = () => {
    setIsCardModalOpen(!isCardModalOpen);
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
                onPress={() => handleDeleteCard(activeCard)}
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
