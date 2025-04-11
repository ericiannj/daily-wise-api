import { FastifyTypedInstance } from '../types';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { listTasksResponse } from '../schemas/task.schema';

export async function listTasks(app: FastifyTypedInstance) {
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
