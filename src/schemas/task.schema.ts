import { z } from 'zod';

const getTaskParam = z.object({
  id: z.string().uuid(),
});

const createTaskBody = z.object({
  title: z.string(),
  description: z.string().optional(),
  tag: z.string().optional(),
  completed: z.boolean().optional(),
});

const updateTaskBody = z.object({
  title: z.optional(z.string()),
  description: z.optional(z.string()),
  tag: z.optional(z.string()),
  completed: z.optional(z.boolean()),
});

const getTaskResponse = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  tag: z.string().nullable(),
  completed: z.boolean().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const listTasksResponse = z.array(getTaskResponse);

const sendTaskMessage = z.object({
  message: z.string(),
});

export {
  createTaskBody,
  updateTaskBody,
  getTaskParam,
  getTaskResponse,
  listTasksResponse,
  sendTaskMessage,
};
