import Hapi from '@hapi/hapi';
import db from './database.js';
import registerWorkoutRoutes from './routes/workoutsRoutes.js';
import cors from '@hapi/cors';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,   
    host: '0.0.0.0',                 
  });

  await server.register({
    plugin: cors,
    options: {
      origins: ['*'],
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return { message: 'Hello World' };
    },
  });

  registerWorkoutRoutes(server);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
