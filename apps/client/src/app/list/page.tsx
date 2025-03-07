'use client';
import React, { useState, useMemo } from 'react';
import Card from '@/components/Card';
import Filter from '@/components/Filter';
import { TaskType } from '@task-master/shared';
import { useCard } from '@/context/CardContext';
import { Tabs, Tab, Button } from '@heroui/react';

export default function Page() {
  const {
    setIsCardManagementModalOpen,
    setIsCardModalOpen,
    setActiveCard,
    cardList,
    cardError: error,
    cardLoading: isLoading,
  } = useCard();
  const [filterState, setFilterState] = useState({ search: '', status: 'all' });

  const handleFilter = () => {
    console.log(123);
  };

  const filteredData = useMemo(() => {
    return cardList || [];
  }, [cardList]);

  const handleOpenCard = (card: TaskType) => () => {
    setActiveCard(card);
    setIsCardModalOpen(true);
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-between">
          <h2 className="text-4xl font-bold mb-5">All Tasks</h2>
          <Button
            color="primary"
            onPress={() => setIsCardManagementModalOpen(true)}
          >
            New Task
          </Button>
        </div>
        <Tabs
          aria-label="Tabs sizes"
          size="lg"
          fullWidth
          onChange={() => handleFilter}
        >
          <Tab key="all" title="All" />
          <Tab key="progress" title="In Progress" />
          <Tab key="done" title="Completed" />
          <Tab key="pending" title="Pending" />
        </Tabs>
      </div>

      {error && <div>Error: {error.message || 'Failed to load'}</div>}
      {isLoading && <div>Loading...</div>}
      {filteredData.length === 0 && !isLoading && <div>No data</div>}
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
