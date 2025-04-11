import { FastifyTypedInstance } from '../types';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { sendTaskMessage } from '../schemas/task.schema';

export async function deleteTask(app: FastifyTypedInstance) {
  app.delete(
    '/tasks/:id',
    {
      schema: {
        tags: ['tasks'],
        description: 'Delete specific task by ID',
        response: {
          204: sendTaskMessage,
          404: sendTaskMessage,
        },
      },
    },
    async (request, reply) => {
      const getTaskParam = z.object({
        id: z.string(),
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

      await prisma.task.delete({
        where: {
          id,
        },
      });

      return reply.status(204);
    },
  );
}
