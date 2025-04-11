import { FastifyTypedInstance } from '../types';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import {
  getTaskParam,
  getTaskResponse,
  sendTaskMessage,
  updateTaskBody,
} from '../schemas/task.schema';

export async function updateTask(app: FastifyTypedInstance) {
  app.patch(
    '/tasks/:id',
    {
      schema: {
        tags: ['tasks'],
        description: 'Update specific task by ID',
        body: updateTaskBody,
        response: {
          200: getTaskResponse,
          404: sendTaskMessage,
        },
      },
    },
    async (request, reply) => {
      const getTaskBody = updateTaskBody;

      const { id } = getTaskParam.parse(request.params);
      const { title, description, tag, completed } = getTaskBody.parse(
        request.body,
      );

      const task = await prisma.task.findUnique({
        where: {
          id,
        },
      });

      if (!task) {
        return reply.status(404).send({ message: 'Task not found' });
      }

      const updatedTask = await prisma.task.update({
        where: {
          id,
        },
        data: {
          title: title || task.title,
          description: description || task.description,
          tag: tag || task.tag,
          completed: completed !== undefined ? completed : task.completed,
        },
      });
      return reply.status(200).send(updatedTask);
    },
  );
}
