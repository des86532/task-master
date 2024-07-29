'use client';

import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useCard } from '@/context/CardContext';

export default function CardGroupmodal() {
  const { isCardGroupModalOpen, setIsCardGroupModalOpen } = useCard();

  return (
    <Modal isOpen={isCardGroupModalOpen} onOpenChange={setIsCardGroupModalOpen}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit
              amet hendrerit risus, sed porttitor quam.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit
              amet hendrerit risus, sed porttitor quam.
            </p>
            <p>
              Magna exercitation reprehenderit magna aute tempor cupidatat
              consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
              incididunt cillum quis. Velit duis sit officia eiusmod Lorem
              aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
              consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
              et. Culpa deserunt nostrud ad veniam.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setIsCardGroupModalOpen(false)}
            >
              Close
            </Button>
            <Button
              color="primary"
              onPress={() => setIsCardGroupModalOpen(false)}
            >
              Action
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
