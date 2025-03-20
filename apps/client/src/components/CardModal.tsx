import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
  CheckboxGroup,
} from '@heroui/react';
import { useCard } from '@/context/CardContext';
import { useEffect, useMemo, useState } from 'react';
import { patchTask } from '@/app/_api/task';

export default function CardModal() {
  const {
    isCardModalOpen,
    setIsCardModalOpen,
    activeCard,
    setActiveCard,
    handleOpenEditCardModal,
    handleDeleteCard,
    updateCards,
  } = useCard();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subTaskValues, setSubTaskValues] = useState<string[]>([]);

  const defaultSubTask = useMemo(() => {
    return (
      activeCard?.subTasks?.map((item, index) => {
        if (item.status) {
          return String(index);
        }
        return '-1';
      }) || []
    );
  }, [activeCard]);

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

  const handleClose = () => {
    setActiveCard(null);
    handleUpdateCard();
  };

  const handleUpdateCard = async () => {
    // 子任務沒變化不處理
    if (defaultSubTask === subTaskValues || !activeCard) return;

    try {
      const payload = {
        title: activeCard.title,
        description: activeCard.description,
        priority: activeCard.priority,
        status: activeCard.status,
        subTasks: activeCard.subTasks.map((task, index) => ({
          ...task,
          status: subTaskValues.includes(String(index)),
        })),
        expired_at: activeCard.expired_at,
        created_at: activeCard.created_at,
        updated_at: new Date().toISOString(),
      };
      await patchTask(activeCard.id, payload);
      updateCards();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the task.');
    }
  };

  useEffect(() => {
    if (!isCardModalOpen || !activeCard) return;

    setSubTaskValues(defaultSubTask);
  }, [isCardModalOpen, activeCard, defaultSubTask]);

  return (
    <Modal
      isOpen={isCardModalOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
      onClose={handleClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {activeCard ? activeCard.title : 'No card selected'}
            </ModalHeader>
            <ModalBody>
              <p>{activeCard ? activeCard.description : 'No card selected'}</p>
              <CheckboxGroup onChange={setSubTaskValues} value={subTaskValues}>
                {activeCard &&
                  activeCard.subTasks.map((item, index) => (
                    <Checkbox
                      value={String(index)}
                      key={index}
                      lineThrough={subTaskValues.includes(String(index))}
                    >
                      {item.title}
                    </Checkbox>
                  ))}
              </CheckboxGroup>
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
