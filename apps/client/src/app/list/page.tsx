'use client';
import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Filter from '@/components/Filter';
import { TaskType } from '@task-master/shared/types';
import { useCard } from '@/context/CardContext';

export default function Page() {
  const {
    setIsCardModalOpen,
    setActiveCard,
    cardList,
    cardError: error,
    cardLoading: isLoading,
  } = useCard();
  const [filteredData, setFilteredData] = useState(cardList || []);

  const handleFilter = (filter: { search: string; status: string }) => {
    if (!cardList) return;

    // 過濾資料
    const { search, status } = filter;
    let filtered = cardList;
    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status !== 'all') {
      filtered = filtered.filter((item) => item.status === status);
    }

    setFilteredData(filtered);
  };

  const handleOpenCard = (card: TaskType) => () => {
    setActiveCard(card);
    setIsCardModalOpen(true);
  };

  useEffect(() => {
    if (cardList) {
      setFilteredData(cardList);
    }
  }, [cardList]);

  return (
    <div className="px-5">
      <div className="my-4">
        <Filter onFilter={handleFilter}></Filter>
      </div>

      {error && <div>Failed to load</div>}
      {isLoading && <div>Loading...</div>}
      {!filteredData && <div>No data</div>}
      <div
        className="grid gap-4 justify-start justify-items-center"
        style={{ gridTemplateColumns: 'repeat(auto-fit, 200px)' }}
      >
        {filteredData.map((item) => (
          <Card
            key={item.id}
            card={item}
            isPressable
            onClick={handleOpenCard(item)}
          ></Card>
        ))}
      </div>
    </div>
  );
}
