import { FastifyTypedInstance } from '../types';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function listTasks(app: FastifyTypedInstance) {
  const listTasksResponse = z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      tag: z.string().nullable(),
      completed: z.boolean().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  );

  app.get(
    '/tasks',
    {
      schema: {
        tags: ['tasks'],
        description: 'List all tasks',
        response: {
          200: listTasksResponse,
        },
      },
    },
    async (request, reply) => {
      const tasks = await prisma.task.findMany();

      return reply.status(200).send(tasks);
    },
  );
}
