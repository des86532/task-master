import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';
import { useCard } from '@/context/CardContext';

export default function CardModal() {
  const { isCardModalOpen, setIsCardModalOpen, activeCard } = useCard();

  const onOpenChange = () => {
    setIsCardModalOpen(!isCardModalOpen);
  };

  return (
    <Modal isOpen={isCardModalOpen} backdrop="blur" onOpenChange={onOpenChange}>
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
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
