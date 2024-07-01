import { z } from 'zod';

enum CardStatus {
  TODO = 'todo',
  PROGRESS = 'progress',
  DONE = 'done',
}

const CardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum([CardStatus.TODO, CardStatus.PROGRESS, CardStatus.DONE]),
  createdAt: z.string(),
  updateAt: z.string(),
});

export type CardType = z.infer<typeof CardSchema>;
