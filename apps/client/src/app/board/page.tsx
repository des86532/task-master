'use client';
import { Button } from '@nextui-org/react';
import { useCard } from '@/context/CardContext';
import BoardCardList from '@/components/BoardCardList';
import { deleteTask } from '@/app/_api/task';
import { Suspense } from 'react';
import { TaskType, TaskStatus } from '@task-master/shared/types';

export default function Board() {
  const { setIsCardGroupModalOpen, setCardModalStatus, cardList, updateCard } =
    useCard();

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

  return (
    <div className="container overflow-auto mx-auto h-full">
      <div className="flex overflow-auto flex-col h-full bg-white rounded-lg">
        <h1 className="mb-4 text-2xl font-bold">Board</h1>
        <div className="grid overflow-auto flex-1 grid-cols-1 gap-4 h-full md:grid-cols-3">
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
        </div>
      </div>
    </div>
  );
}
