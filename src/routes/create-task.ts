import { FastifyTypedInstance } from '../types';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { randomUUID } from 'node:crypto';

export async function createTask(app: FastifyTypedInstance) {
  const createTaskBody = z.object({
    title: z.string(),
    description: z.string().optional(),
    tag: z.string().optional(),
    completed: z.boolean().optional(),
  });

  app.post(
    '/tasks',
    {
      schema: {
        tags: ['tasks'],
        description: 'Create a task',
        body: createTaskBody,
        response: {
          201: z
            .object({
              id: z.string(),
            })
            .describe('New task created'),
        },
      },
    },
    async (request, reply) => {
      const { title, completed, description, tag } = createTaskBody.parse(
        request.body,
      );

      const task = await prisma.task.create({
        data: {
          id: randomUUID(),
          title,
          description,
          completed,
          tag,
        },
      });

      return reply.status(201).send({ id: task.id });
    },
  );
}
