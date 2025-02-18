'use client';
import { Button, Select, SelectItem } from '@heroui/react';
import { useCard } from '@/context/CardContext';
import { useApp } from '@/context/AppContext';
import BoardCardList from '@/components/BoardCardList';
import { deleteTask } from '@/app/_api/task';
import { Suspense, useState } from 'react';
import { TaskType, TaskStatus } from '@task-master/shared';

export default function Board() {
  const { setIsCardGroupModalOpen, setCardModalStatus, cardList, updateCard } =
    useCard();
  const { isMobile } = useApp();

  const [status, setStatus] = useState(TaskStatus.TODO);

  const filteredCardListByStatus = (status: TaskStatus) => {
    return cardList?.filter((card) => card.status === status) ?? [];
  };

  const handleAdd = (status: TaskStatus) => {
    setCardModalStatus(status);
    setIsCardGroupModalOpen(true);
  };

  const handleDeleteCard = async (card: TaskType) => {
    if (!card) return;

    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteTask(card.id);
        console.log('刪除成功');
        updateCard();
      } catch (error) {
        console.log('刪除失敗', error);
      }
    }
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === status) return;

    setStatus(e.target.value as TaskStatus);
  };

  return (
    <div className="container overflow-auto mx-auto h-full">
      <div className="flex overflow-auto flex-col px-5 py-4 h-full bg-white rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Board</h1>
          <div className="w-2/5 md:hidden">
            <Select
              label="Select status"
              value={status}
              defaultSelectedKeys={[status]}
              onChange={handleChangeStatus}
            >
              <SelectItem value={TaskStatus.PROGRESS} key={TaskStatus.PROGRESS}>
                {TaskStatus.PROGRESS}
              </SelectItem>
              <SelectItem value={TaskStatus.TODO} key={TaskStatus.TODO}>
                {TaskStatus.TODO}
              </SelectItem>
              <SelectItem value={TaskStatus.DONE} key={TaskStatus.DONE}>
                {TaskStatus.DONE}
              </SelectItem>
            </Select>
          </div>
        </div>
        <div className="grid overflow-auto flex-1 grid-cols-1 gap-4 h-full md:grid-cols-3">
          {(!isMobile || status === TaskStatus.TODO) && (
            <div className="flex overflow-auto flex-col p-4 rounded-lg border">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">To Do</h2>
                <Button
                  size="sm"
                  radius="full"
                  color="primary"
                  onPress={() => handleAdd(TaskStatus.TODO)}
                >
                  Add
                </Button>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <BoardCardList
                  list={filteredCardListByStatus(TaskStatus.TODO)}
                  onDelete={handleDeleteCard}
                />
              </Suspense>
            </div>
          )}
          {(!isMobile || status === TaskStatus.PROGRESS) && (
            <div className="flex overflow-auto flex-col p-4 rounded-lg border">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">progress</h2>
                <Button
                  size="sm"
                  radius="full"
                  color="primary"
                  onPress={() => handleAdd(TaskStatus.PROGRESS)}
                >
                  Add
                </Button>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <BoardCardList
                  list={filteredCardListByStatus(TaskStatus.PROGRESS)}
                  onDelete={handleDeleteCard}
                />
              </Suspense>
            </div>
          )}
          {(!isMobile || status === TaskStatus.DONE) && (
            <div className="flex overflow-auto flex-col p-4 rounded-lg border">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">done</h2>
                <Button
                  size="sm"
                  radius="full"
                  color="primary"
                  onPress={() => handleAdd(TaskStatus.DONE)}
                >
                  Add
                </Button>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <BoardCardList
                  list={filteredCardListByStatus(TaskStatus.DONE)}
                  onDelete={handleDeleteCard}
                />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
