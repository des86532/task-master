'use client';
import { Input, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react';

export default function Filter({
  onFilter,
}: {
  onFilter: (filter: { search: string; status: string }) => void;
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilter({
      search: e.target.value,
      status,
    });
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === status) return;

    setStatus(e.target.value);
    onFilter({
      search,
      status: e.target.value,
    });
  };

  return (
    <div className="flex justify-between">
      <div className="w-1/2">
        <Input
          label="search text"
          placeholder="Search"
          value={search}
          onChange={handleChangeSearch}
        />
      </div>
      <div className="w-1/5">
        <Select
          label="Select status"
          value={status}
          defaultSelectedKeys={[status]}
          onChange={handleChangeStatus}
        >
          <SelectItem value="all" key="all">
            all
          </SelectItem>
          <SelectItem value="progress" key="progress">
            progress
          </SelectItem>
          <SelectItem value="todo" key="todo">
            todo
          </SelectItem>
          <SelectItem value="done" key="done">
            done
          </SelectItem>
        </Select>
      </div>
    </div>
  );
}
