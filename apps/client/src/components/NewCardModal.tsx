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
} from '@nextui-org/react';
import { getLocalTimeZone, today, parseDate } from '@internationalized/date';
import { useState } from 'react';
import { createTask } from '@/app/_api/task';
import { TaskStatus } from '@task-master/shared/types';

import { useCard } from '@/context/CardContext';

export default function NewCardModal() {
  const { isNewCardModalOpen, setIsNewCardModalOpen } = useCard();

  // 新增狀態來管理表單資料
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(0);
  // 使用 TaskStatus 枚舉型別來管理狀態
  const [status, setStatus] = useState('pending');
  const [expiredAt, setExpiredAt] = useState(today(getLocalTimeZone()));
  const [description, setDescription] = useState('');

  const onOpenChange = () => {
    setIsNewCardModalOpen(!isNewCardModalOpen);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        priority,
        status: status as TaskStatus,
        expired_at: new Date(
          expiredAt.toDate(getLocalTimeZone()).setHours(23, 59, 59)
        ).toISOString(),
        description,
      };

      await createTask(payload);
      onOpenChange();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      isOpen={isNewCardModalOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">New Card</ModalHeader>
            <ModalBody>
              <Input
                type="text"
                label="Title"
                isRequired
                size="sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // 綁定標題
                isInvalid={title.length === 0}
                errorMessage="Please enter title"
              />
              <div className="flex gap-4 justify-between">
                <Input
                  type="number"
                  label="Priority"
                  size="sm"
                  value={String(priority)}
                  onChange={(e) => setPriority(Number(e.target.value))} // 綁定優先級
                />
                <Select
                  label="Select a status"
                  className="max-w-xs"
                  size="sm"
                  value={status}
                  defaultSelectedKeys={['pending']}
                  onChange={(e) => setStatus(e.target.value)} // 綁定狀態
                >
                  <SelectItem key="pending">Pending</SelectItem>
                  <SelectItem key="todo">Todo</SelectItem>
                  <SelectItem key="progress">Progress</SelectItem>
                  <SelectItem key="done">Done</SelectItem>
                </Select>
              </div>
              <DatePicker
                label="Expired At"
                className="w-full"
                minValue={today(getLocalTimeZone())}
                defaultValue={today(getLocalTimeZone())} // 綁定到到期日期
                onChange={(date) => setExpiredAt(date)} // 更新到期日期
              />
              <Textarea
                label="Description"
                placeholder="Enter your description"
                className="w-full"
                size="lg"
                minRows={5}
                maxRows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)} // 綁定描述
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
