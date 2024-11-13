'use client';
import { Button } from '@nextui-org/react';
import { useCard } from '@/context/CardContext';
import BoardCardList from '@/components/BoardCardList';
import { TASK_API, deleteTask } from '@/app/_api/task';
import { Suspense } from 'react';
import useFetchData from '@/app/_hooks/useFetchData';
import { TaskType, TaskStatus } from '@task-master/shared/types';

export default function Board() {
  const {
    data: cardList,
    error,
    isLoading,
    mutate,
  } = useFetchData<TaskType[]>(TASK_API.getAllTask());
  const { setIsCardGroupModalOpen, setCardModalStatus } = useCard();

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
        mutate();
      } catch (error) {
        console.log('刪除失敗', error);
      }
    }
  };

  return (
    <div className="container p-4 mx-auto h-full">
      <div className="flex flex-col p-6 h-full bg-white rounded-lg">
        <h1 className="mb-4 text-2xl font-bold">Board</h1>
        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col p-4 rounded-lg border">
            <h2 className="text-xl font-semibold">todo</h2>
            <Suspense fallback={<div>Loading...</div>}>
              <BoardCardList
                list={filteredCardListByStatus(TaskStatus.TODO)}
                onDelete={handleDeleteCard}
              />
            </Suspense>
            <div className="space-y-2">
              <Button
                color="primary"
                className="w-full"
                onPress={() => handleAdd(TaskStatus.TODO)}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="flex flex-col p-4 rounded-lg border">
            <h2 className="text-xl font-semibold">progress</h2>
            <Suspense fallback={<div>Loading...</div>}>
              <BoardCardList
                list={filteredCardListByStatus(TaskStatus.PROGRESS)}
                onDelete={handleDeleteCard}
              />
            </Suspense>
            <div className="space-y-2">
              <Button
                color="primary"
                className="w-full"
                onPress={() => handleAdd(TaskStatus.PROGRESS)}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="flex flex-col p-4 rounded-lg border">
            <h2 className="text-xl font-semibold">done</h2>
            <Suspense fallback={<div>Loading...</div>}>
              <BoardCardList
                list={filteredCardListByStatus(TaskStatus.DONE)}
                onDelete={handleDeleteCard}
              />
            </Suspense>
            <div className="space-y-2">
              <Button
                color="primary"
                className="w-full"
                onPress={() => handleAdd(TaskStatus.DONE)}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
