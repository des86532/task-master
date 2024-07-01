import Card from '../../components/Card';
import Filter from '../../components/Filter';

export default function Page() {
  const list = [
    {
      id: 1,
      title: 'Orange',
      description: '$5.50',
      status: 'done',
      createdAt: '2021-10-10',
      updateAt: '2021-10-10',
    },
    {
      id: 2,
      title: 'Tangerine',
      description: '$3.00',
      status: 'todo',
      createdAt: '2021-10-10',
      updateAt: '2021-10-10',
    },
    {
      id: 3,
      title: 'Raspberry',
      description: '$10.00',
      status: 'todo',
      createdAt: '2021-10-10',
      updateAt: '2021-10-10',
    },
    {
      id: 4,
      title: 'Lemon',
      description: '$5.30',
      status: 'todo',
      createdAt: '2021-10-10',
      updateAt: '2021-10-10',
    },
    {
      id: 5,
      title: 'Avocado',
      description: '$15.70',
      status: 'todo',
      createdAt: '2021-10-10',
      updateAt: '2021-10-10',
    },
    {
      id: 6,
      title: 'Lemon 2',
      description: '$8.00',
      status: 'progress',
      createdAt: '2021-10-10',
      updateAt: '2021-10-10',
    },
    {
      id: 7,
      title: 'Banana',
      description: '$7.50',
      status: 'progress',
      createdAt: '2021-10-10',
      updateAt: '2021-10-10',
    },
    {
      id: 8,
      title: 'Watermelon',
      description: '$12.20',
      status: 'done',
      createdAt: '2021-10-10',
      updateAt: '2021-10-10',
    },
  ];

  const handleChangeStatus = (status: string) => {
    console.log(status);
  };

  return (
    <div className="container mx-auto">
      <div className="my-4">
        <Filter onChangeStatusEvent={handleChangeStatus}></Filter>
      </div>
      <div
        className="grid gap-4 justify-items-center"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
      >
        {list.map((item) => {
          return <Card card={item} key={item.id}></Card>;
        })}
      </div>
    </div>
  );
}
