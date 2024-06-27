import Card from '../../components/Card';
import Filter from '../../components/Filter';

export default function Page() {
  const list = [
    {
      id: 1,
      title: 'Orange',
      description: '$5.50',
      status: 'todo',
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
      status: 'todo',
      createdAt: '2021-10-10',
      updateAt: '2021-10-10',
    },
    {
      id: 7,
      title: 'Banana',
      description: '$7.50',
      status: 'todo',
      createdAt: '2021-10-10',
      updateAt: '2021-10-10',
    },
    {
      id: 8,
      title: 'Watermelon',
      description: '$12.20',
      status: 'todo',
      createdAt: '2021-10-10',
      updateAt: '2021-10-10',
    },
  ];

  return (
    <div className="container mx-auto">
      <Filter></Filter>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 2xl:grid-cols-6 justify-items-center">
        {list.map((item, index) => {
          return <Card card={item} key={index}></Card>;
        })}
      </div>
    </div>
  );
}
