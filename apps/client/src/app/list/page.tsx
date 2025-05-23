'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useCard } from '@/context/CardContext';
import {
  Tabs,
  Tab,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  Progress,
  Avatar,
  Chip,
} from '@heroui/react';
import dayjs from 'dayjs';
import { TaskStatus, SubTaskType } from '@task-master/shared';
import {
  TASK_STATUS_TAB_OPTIONS,
  TabKey,
  TASK_STATUS,
} from '@/constants/status';
import {
  IconTrash,
  IconEdit,
  IconEye,
  IconAlert,
  IconClock,
  IconCheckCircle,
} from '@/icons';

const tableHeader = [
  { key: 'Task', label: 'Task', width: 300, minWidth: 150 },
  { key: 'Role', label: 'Role', width: 50, minWidth: 50 },
  { key: 'Due Date', label: 'Due Date', width: 100, minWidth: 100 },
  { key: 'Progress', label: 'Progress', width: 150, minWidth: 150 },
  { key: 'Status', label: 'Status', width: 120, minWidth: 120 },
  { key: 'Action', label: 'Action', width: 100, minWidth: 100 },
];

export default function Page() {
  const {
    cardList,
    cardLoading: isLoading,
    handleOpenCardModal,
    handleOpenNewCardModal,
    handleDeleteCard,
    handleOpenEditCardModal,
  } = useCard();

  const [selected, setSelected] = useState<'all' | TaskStatus>(
    TaskStatus.PENDING
  );

  const handleFilter = (key: TabKey) => {
    setSelected(key as TaskStatus);
  };

  const filteredData = useMemo(() => {
    const cards = Array.isArray(cardList) ? cardList : [];
    if (selected === 'all') return cards;

    return cards.filter((item) => item.status === selected);
  }, [cardList, selected]);

  const computedPercentage = (list: SubTaskType[]) => {
    if (!Array.isArray(list) || list.length === 0) return 0;

    return (list.filter((item) => item.status).length / list.length) * 100;
  };

  useEffect(() => {
    console.log(cardList);
  }, [cardList]);

  return (
    <div className="flex flex-col gap-8 h-full">
      <div>
        <div className="flex justify-between">
          <h2 className="text-4xl font-bold mb-5">All Tasks</h2>
          <Button
            color="primary"
            onPress={() => handleOpenNewCardModal(new Date())}
          >
            New Task
          </Button>
        </div>
        <Tabs
          aria-label="Task Status Tabs"
          size="lg"
          fullWidth
          selectedKey={selected}
          onSelectionChange={(key) => handleFilter(key as TabKey)}
        >
          {TASK_STATUS_TAB_OPTIONS.map((item) => (
            <Tab key={item.key} title={item.label}></Tab>
          ))}
        </Tabs>
      </div>

      <div className="flex-1 overflow-auto scrollbar-hide">
        <Table
          shadow="none"
          aria-label="task table"
          isHeaderSticky
          className="border rounded-lg border-custom"
          classNames={{
            th: 'text-base',
            tr: '!shadow-none text-base',
            td: 'h-[60px]',
          }}
          removeWrapper
        >
          <TableHeader columns={tableHeader}>
            {tableHeader.map((item) => (
              <TableColumn
                key={item.key}
                width={item.width}
                minWidth={item.minWidth}
                className="rounded-none text-black"
              >
                {item.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody
            items={filteredData}
            isLoading={isLoading}
            loadingContent="Loading..."
            emptyContent="No data"
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div
                    className="flex gap-4 cursor-pointer"
                    onClick={() => handleOpenCardModal(item.id)}
                  >
                    <span className="flex-1">{item.title}</span>
                    <IconEye className="w-6 h-6 text-primary" />
                  </div>
                </TableCell>
                <TableCell>
                  <Avatar
                    alt="fffff"
                    className="flex-shrink-0"
                    size="md"
                    showFallback
                    name={item.updated_by?.name}
                    src={item.updated_by?.avatar}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 items-center">
                    <span>{dayjs(item.expired_at).format('YYYY/MM/DD')}</span>
                    {item.status === TaskStatus.COMPLETED ? (
                      <IconCheckCircle className="w-5 h-5 text-success"></IconCheckCircle>
                    ) : item.isExpired ? (
                      <IconAlert className="w-5 h-5 text-danger"></IconAlert>
                    ) : (
                      item.willExpireInThreeDays && (
                        <IconClock className="w-5 h-5 text-warning"></IconClock>
                      )
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="pr-4">
                    <Progress
                      aria-label="Loading..."
                      size="sm"
                      showValueLabel={true}
                      value={computedPercentage(item.subTasks)}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Chip
                    size="lg"
                    color={
                      item.status === TaskStatus.COMPLETED
                        ? 'success'
                        : item.status === TaskStatus.PROGRESS
                        ? 'primary'
                        : 'default'
                    }
                  >
                    {TASK_STATUS[item.status]?.label}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <Button
                      isIconOnly
                      variant="light"
                      className="w-6 h-6 min-w-6 min-h-6"
                      onPress={() => handleOpenEditCardModal(item)}
                    >
                      <IconEdit className="w-5 h-5 text-default-700" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      className="w-6 h-6 min-w-6 min-h-6"
                      onPress={() => handleDeleteCard(item)}
                    >
                      <IconTrash className="w-6 h-6 text-danger" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
