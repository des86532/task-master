'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Page() {
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
        eventAdd={(info) => {
          alert(info.event.title);
        }}
        events={[
          { title: 'event 1', test: 123, date: '2025-04-01' },
          { title: 'event 2', date: '2025-04-02' },
        ]}
      />
    </div>
  );
}
