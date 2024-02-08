import { z } from 'zod';
import { priorities } from './data';

export const AddTodoSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(2, { message: 'Min length is 2' }),

  description: z
    .string({ required_error: 'Description is required' })
    .min(2, { message: 'Min length is 2' }),

  priority: z.enum([...(priorities as [string, ...string[]])], {
    required_error: 'Priority is required and it has to be low, medium, high',
  }),
});

export type AddTodoSchemaType = z.infer<typeof AddTodoSchema>;
