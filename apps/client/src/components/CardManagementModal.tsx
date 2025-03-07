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
import { useEffect, useMemo, useState } from 'react';
import { createTask, patchTask } from '@/app/_api/task';
import { TaskStatus } from '@task-master/shared';
import { useCard } from '@/context/CardContext';

export default function CardManagementModal() {
  const {
    isCardManagementModalOpen,
    setIsCardManagementModalOpen,
    updateCards,
    setActiveCard,
    activeCard,
    cardList,
  } = useCard();

  type FormData = {
    title: string;
    priority: number;
    status: TaskStatus;
    expired_at: CalendarDate;
    description: string;
  };

  const [formData, setFormData] = useState<FormData>({
    title: '',
    priority: 0,
    status: TaskStatus.PENDING,
    expired_at: today(getLocalTimeZone()),
    description: '',
  });

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

  // 新增/更新卡片
  const handleSubmit = async () => {
    try {
      if (!formData.title) {
        alert('Title is required');
        return;
      }
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
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the task.'); // 顯示錯誤訊息
    }
  };

  const memoizedActiveCard = useMemo(() => {
    return cardList?.find((card) => card.id === activeCard?.id) || null;
  }, [cardList, activeCard?.id]);

  useEffect(() => {
    setActiveCard(memoizedActiveCard);
  }, [memoizedActiveCard, setActiveCard]);

  useEffect(() => {
    if (!isCardManagementModalOpen || !activeCard) return;

    setFormData({
      title: activeCard.title,
      priority: activeCard.priority,
      status: activeCard.status,
      expired_at: toCalendarDate(
        parseAbsolute(activeCard.expired_at, getLocalTimeZone())
      ),
      description: activeCard.description,
    });
  }, [isCardManagementModalOpen, activeCard]);

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
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <SelectItem key="pending">Pending</SelectItem>
                  <SelectItem key="progress">Progress</SelectItem>
                  <SelectItem key="done">Done</SelectItem>
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
              <Button color="primary" onPress={handleSubmit}>
                {activeCard ? 'Confirm' : 'Add'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
