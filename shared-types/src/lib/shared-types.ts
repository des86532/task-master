import { z } from 'zod';

export const CardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updateAt: z.string(),
});

export type CardType = z.infer<typeof CardSchema>;
