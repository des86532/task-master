'use client';
import { Input, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react';
import { TaskStatus } from '@task-master/shared';

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
      <div className="w-2/5 md:w-1/5">
        <Select
          label="Select status"
          value={status}
          defaultSelectedKeys={[status]}
          onChange={handleChangeStatus}
        >
          <SelectItem value="all" key="all">
            all
          </SelectItem>
          <SelectItem value={TaskStatus.PENDING} key={TaskStatus.PENDING}>
            {TaskStatus.PENDING}
          </SelectItem>
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
  );
}
