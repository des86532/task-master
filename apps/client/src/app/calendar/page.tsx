'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useCard } from '@/context/CardContext';
import { useEffect, useState } from 'react';
import { patchTask } from '@/app/_api/task';
import type { EventChangeArg, EventClickArg } from '@fullcalendar/core';
import type { TaskType } from '@task-master/shared';

type CalendarEvent = Omit<TaskType, 'id'> & {
  id: string;
  start: string;
  end: string;
};

export default function Page() {
  const {
    cardList,
    setActiveCard,
    setIsCardModalOpen,
    updateCards,
    handleOpenNewCardModal,
  } = useCard();
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // 更新卡片
  const handleCardPatch = async (info: EventChangeArg) => {
    const { event } = info;
    if (!event.start) return;
    const date = new Date(event.start);
    date.setHours(23, 59, 59);

    try {
      await patchTask(Number(event.id), {
        expired_at: date.toISOString(),
      });
      updateCards();
    } catch (error) {
      console.error(error);
    }
  };

  // 點擊卡片
  const handleCardClick = (info: EventClickArg) => {
    const { event } = info;
    const card = cardList?.find((card) => card.id === Number(event.id));
    setActiveCard(card || null);
    setIsCardModalOpen(true);
  };

  const handleDateClick = (info: DateClickArg) => {
    handleOpenNewCardModal(info.date);
  };

  // 初始化日曆資料
  useEffect(() => {
    if (!cardList) return;
    setEvents(
      cardList.map((card) => ({
        ...card,
        id: String(card.id),
        start: card.expired_at,
        end: card.expired_at,
      }))
    );
  }, [cardList]);

  return (
    <div className="demo-app-main">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridYear,dayGridMonth',
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        defaultAllDay={true}
        events={events}
        eventChange={handleCardPatch}
        eventClick={handleCardClick}
        dateClick={handleDateClick}
      />
    </div>
  );
}
