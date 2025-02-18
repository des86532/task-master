'use client';
import React, { useState, useMemo } from 'react';
import Card from '@/components/Card';
import Filter from '@/components/Filter';
import { TaskType } from '@task-master/shared';
import { useCard } from '@/context/CardContext';

export default function Page() {
  const {
    setIsCardModalOpen,
    setActiveCard,
    cardList,
    cardError: error,
    cardLoading: isLoading,
  } = useCard();
  const [filterState, setFilterState] = useState({ search: '', status: 'all' });

  const handleFilter = (filter: { search: string; status: string }) => {
    setFilterState(filter);
  };

  const filteredData = useMemo(() => {
    if (!cardList) return [];
    const { search, status } = filterState;
    return cardList.filter(
      (item) =>
        (!search || item.title.toLowerCase().includes(search.toLowerCase())) &&
        (status === 'all' || item.status === status)
    );
  }, [filterState, cardList]);

  const handleOpenCard = (card: TaskType) => () => {
    setActiveCard(card);
    setIsCardModalOpen(true);
  };

  return (
    <div className="px-5 pb-2">
      <div className="my-4">
        <Filter onFilter={handleFilter}></Filter>
      </div>

      {error && <div>Error: {error.message || 'Failed to load'}</div>}
      {isLoading && <div>Loading...</div>}
      {filteredData.length === 0 && <div>No data</div>}
      <div className="grid grid-cols-[repeat(auto-fit,100%)] gap-4 justify-start justify-items-center md:grid-cols-[repeat(auto-fit,200px)]">
        {filteredData.map((item) => (
          <Card
            key={item.id}
            card={item}
            isPressable
            onPress={handleOpenCard(item)}
          ></Card>
        ))}
      </div>
    </div>
  );
}
