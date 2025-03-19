import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Select,
  SelectItem,
  DatePicker,
} from '@heroui/react';
import {
  getLocalTimeZone,
  today,
  parseAbsolute,
  CalendarDate,
  toCalendarDate,
} from '@internationalized/date';
import { useEffect, useState, useCallback } from 'react';
import { createTask, patchTask } from '@/app/_api/task';
import { TaskStatus } from '@task-master/shared';
import { useCard } from '@/context/CardContext';
import { TASK_STATUS } from '@/constants/status';
import { initialFormData, FormData } from '@/constants/form';

export default function CardManagementModal() {
  const {
    setIsCardModalOpen,
    isCardManagementModalOpen,
    setIsCardManagementModalOpen,
    updateCards,
    activeCard,
    defaultExpiredDate,
  } = useCard();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    key: keyof FormData,
    value: FormData[keyof FormData]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // modal 開關
  const onOpenChange = () => {
    setIsCardManagementModalOpen(!isCardManagementModalOpen);
  };

  // 處理日期選擇
  const handleChangeExpiredAt = (date: CalendarDate | null) => {
    handleChange('expired_at', date ?? today(getLocalTimeZone()));
  };

  const clearForm = useCallback(() => {
    const dateToCalendarDate = (date: Date): CalendarDate => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are 0-indexed in JavaScript
      const day = date.getDate();

      return new CalendarDate(year, month, day);
    };

    const updatedFormData = {
      ...initialFormData,
      expired_at: dateToCalendarDate(defaultExpiredDate),
    };
    setFormData(updatedFormData);
  }, [defaultExpiredDate]);

  // 新增/更新卡片
  const handleSubmit = async () => {
    if (!formData.title) {
      alert('Title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        expired_at: new Date(
          formData.expired_at.toDate(getLocalTimeZone()).setHours(23, 59, 59)
        ).toISOString(),
        created_at: activeCard
          ? activeCard.created_at
          : new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (activeCard) {
        await patchTask(activeCard.id, payload);
      } else {
        await createTask(payload);
      }
      updateCards();
      onOpenChange();
      setIsCardModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isCardManagementModalOpen) return;

    clearForm();

    if (activeCard) {
      setFormData({
        title: activeCard.title,
        priority: activeCard.priority,
        status: activeCard.status,
        expired_at: toCalendarDate(
          parseAbsolute(activeCard.expired_at, getLocalTimeZone())
        ),
        description: activeCard.description,
      });
    }
  }, [isCardManagementModalOpen, activeCard, clearForm]);

  return (
    <Modal
      isOpen={isCardManagementModalOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {activeCard ? 'Edit' : 'New'} Card
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                label="Title"
                isRequired
                size="sm"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                isInvalid={formData.title.length === 0}
                errorMessage="Please enter title"
              />
              <div className="flex gap-4 justify-between w-full">
                <Input
                  type="number"
                  label="Priority"
                  size="sm"
                  value={String(formData.priority)}
                  onChange={(e) =>
                    handleChange('priority', Number(e.target.value))
                  }
                />
                <Select
                  label="Select a status"
                  className="max-w-xs"
                  size="sm"
                  selectedKeys={[formData.status]}
                  onChange={(e) =>
                    handleChange('status', e.target.value as TaskStatus)
                  }
                >
                  {Object.values(TASK_STATUS).map((item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <DatePicker
                label="Expired At"
                className="w-full"
                granularity="day"
                value={formData.expired_at}
                defaultValue={
                  activeCard
                    ? parseAbsolute(activeCard.expired_at, getLocalTimeZone())
                    : today(getLocalTimeZone())
                }
                onChange={handleChangeExpiredAt}
              />
              <Textarea
                label="Description"
                placeholder="Enter your description"
                className="w-full"
                size="lg"
                minRows={5}
                maxRows={10}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {activeCard ? 'Confirm' : 'Add'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
