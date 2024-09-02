import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CardProps,
} from '@nextui-org/react';
import { CardType } from '@task-master/shared/types';

interface Props extends CardProps {
  card: CardType;
  selected?: boolean;
}

export default function Index({ card, selected, ...props }: Props) {
  return (
    <Card
      key={card.id}
      className={`w-[200px] h-[200px] cursor-pointer ${
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
        <span>time</span>
        <span>
          <Chip size="sm">Small</Chip>
        </span>
      </CardFooter>
    </Card>
  );
}
