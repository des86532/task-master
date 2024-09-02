'use client';
import { Button } from '@nextui-org/react';
import { useCard } from '@/context/CardContext';
import BoardCardList from '@/components/BoardCardList';

export default function Board() {
  const { setIsCardGroupModalOpen } = useCard();

  const handleAdd = () => {
    setIsCardGroupModalOpen(true);
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="p-6 bg-white rounded-lg">
        <h1 className="mb-4 text-2xl font-bold">Board</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="p-4 rounded-lg border">
            <h2 className="text-xl font-semibold">todo</h2>
            <BoardCardList />
            <div className="space-y-2">
              <Button color="primary" className="w-full" onPress={handleAdd}>
                Add
              </Button>
            </div>
          </div>
          <div className="p-4 rounded-lg border">
            <h2 className="text-xl font-semibold">progress</h2>
            <BoardCardList />
            <div className="space-y-2">
              <Button color="primary" className="w-full" onPress={handleAdd}>
                Add
              </Button>
            </div>
          </div>
          <div className="p-4 rounded-lg border">
            <h2 className="text-xl font-semibold">done</h2>
            <BoardCardList />
            <div className="space-y-2">
              <Button color="primary" className="w-full" onPress={handleAdd}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
