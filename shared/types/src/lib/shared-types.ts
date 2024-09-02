import { z } from 'zod';

export enum CardStatus {
  TODO = 'todo',
  PROGRESS = 'progress',
  DONE = 'done',
}

const CardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(CardStatus),
  createdAt: z.string(),
  updateAt: z.string(),
});

export type CardType = z.infer<typeof CardSchema>;
