import { FastifyTypedInstance } from '../types';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { getTaskResponse, sendTaskMessage } from '../schemas/task.schema';

export async function getTask(app: FastifyTypedInstance) {
  app.get(
    '/tasks/:id',
    {
      schema: {
        tags: ['tasks'],
        description: 'Get specific task by ID',
        response: {
          200: getTaskResponse,
          404: sendTaskMessage,
        },
      },
    },
    async (request, reply) => {
      const getTaskParam = z.object({
        id: z.string().uuid(),
      });
      const { id } = getTaskParam.parse(request.params);
      const task = await prisma.task.findUnique({
        where: {
          id,
        },
      });

      if (!task) {
        return reply.status(404).send({ message: 'Task not found' });
      }

      return reply.status(200).send(task);
    },
  );
}
