'use client';
import { Input, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react';

export default function Filter({
  onChangeStatusEvent,
}: {
  onChangeStatusEvent: (status: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onChangeStatusEvent(e.target.value);
  };

  return (
    <div className="flex justify-between">
      <div className="w-1/2">
        <Input
          label="Select an animal"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-1/5">
        <Select
          label="Select an animal"
          value={status}
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
