import z from "zod";
import { FastifyTypedInstance } from "./types";
import { randomUUID } from "node:crypto";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
}

const tasks: Task[] = []

export async function routes(app: FastifyTypedInstance) {
  app.get('/tasks', {
    schema: {
      tags: ['tasks'],
      description: 'List all tasks',
      response: {
        200: z.array(z.object({
          id: z.string(),
          title: z.string(),
          description: z.string().optional(),
          completed: z.boolean().optional(),
        }))
      }
    },
  }, () => {
    return tasks
  })

  app.post('/tasks', {
    schema: {
      tags: ['tasks'],
      description: 'Create a task',
      body: z.object({
        title: z.string(),
        description: z.string().optional(),
        completed: z.boolean().optional(),
      }),
      response: {
        201: z.null().describe('Task Created'),
      }
    }
  }, async (request, reply) => {
    const {title, completed, description} = request.body

    tasks.push({
      id: randomUUID(),
      title, 
      completed, 
      description,
    })
    
    return reply.status(201).send()
  })
}