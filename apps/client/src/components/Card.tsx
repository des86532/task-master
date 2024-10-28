import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CardProps,
} from '@nextui-org/react';
import { TaskType } from '@task-master/shared/types';
import dayjs from 'dayjs';

interface Props extends CardProps {
  card: TaskType;
  selected?: boolean;
}

export default function Index({ card, selected, ...props }: Props) {
  return (
    <Card
      key={card.id}
      className={`w-[200px] h-[200px] cursor-pointer select-none ${
        selected ? 'border-2 border-blue-500' : ''
      }`}
      {...props}
    >
      <CardHeader>
        <b>{card.title}</b>
      </CardHeader>
      <CardBody className="overflow-auto px-3 py-0 scrollbar-hide">
        <p>{card.description}</p>
      </CardBody>
      <CardFooter className="justify-between text-small">
        <span>{dayjs(card.created_at).format('YYYY/MM/DD HH:mm')}</span>
        <span>
          <Chip size="sm">Small</Chip>
        </span>
      </CardFooter>
    </Card>
  );
}
