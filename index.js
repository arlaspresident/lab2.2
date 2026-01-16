import Hapi from '@hapi/hapi';
import db from './database.js';
import registerWorkoutRoutes from './routes/workoutsRoutes.js';

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return { message: 'Hello World' };
    }
  });

  registerWorkoutRoutes(server);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
