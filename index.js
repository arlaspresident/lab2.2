import Hapi from '@hapi/hapi';

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

  await server.start();
  console.log('Server running on http://localhost:3000');

};

init();