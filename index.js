import Hapi from '@hapi/hapi';
import db from "./database.js";


const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
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
  console.log('Server running on http://localhost:3000');

};

init();