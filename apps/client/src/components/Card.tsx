import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CardProps,
} from '@heroui/react';
import { TaskType } from '@task-master/shared';
import dayjs from 'dayjs';

interface Props extends CardProps {
  card: TaskType;
  selected?: boolean;
}

export default function Index({ card, selected, ...props }: Props) {
  return (
    <Card
      key={card.id}
      className={`w-full h-[200px] md:w-[200px] cursor-pointer select-none ${
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
        <span>{dayjs(card.created_at).format('YYYY/MM/DD')}</span>
        <span>
          <Chip size="sm">{card.status}</Chip>
        </span>
      </CardFooter>
    </Card>
  );
}
