import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { fastify } from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createTask } from './routes/create-task';
import { listTasks } from './routes/list-tasks';
import { getTask } from './routes/get-task';
import { updateTask } from './routes/update-task';
import { deleteTask } from './routes/delete-tasl';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: '*' });

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'DailyWise API',
      description: 'API for DailyWise',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.register(createTask);
app.register(listTasks);
app.register(getTask);
app.register(updateTask);
app.register(deleteTask);

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running.');
});
