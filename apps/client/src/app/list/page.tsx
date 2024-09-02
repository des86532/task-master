'use client';
import React, { useState } from 'react';
import Card from '@/components/Card';
import Filter from '@/components/Filter';
import { cardListData } from '@task-master/shared/mock';

export default function Page() {
  const [filteredData, setFilteredData] = useState(cardListData);

  const handleFilter = (filter: { search: string; status: string }) => {
    const { search, status } = filter;
    let filtered = cardListData;
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

  return (
    <div className="container mx-auto">
      <div className="my-4">
        <Filter onFilter={handleFilter}></Filter>
      </div>
      <div
        className="grid gap-4 justify-between justify-items-center"
        style={{ gridTemplateColumns: 'repeat(auto-fit, 200px)' }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((item) => <Card key={item.id} card={item}></Card>)
        ) : (
          <div className="text-center">No data found</div>
        )}
      </div>
    </div>
  );
}
