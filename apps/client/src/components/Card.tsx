import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from '@nextui-org/react';
import { CardType } from '@task-master/shared-types';

interface Props {
  card: CardType;
}

export default function Index({ card }: Props) {
  return (
    <Card key={card.id} className="w-[200px] h-[200px]">
      <CardHeader>
        <b>{card.title}</b>
      </CardHeader>
      <CardBody className="px-3 py-0 overflow-auto scrollbar-hide">
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
