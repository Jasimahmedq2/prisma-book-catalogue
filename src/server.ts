import { Server } from 'http';
import app from './app';
import config from './config';

//postgres://postgres:[YOUR-PASSWORD]@db.xrvswjsutrvaijeqydge.supabase.co:6543/postgres
// sb$q$e!hZbV7jFZ


async function bootstrap() {

  const server: Server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });

  const exitHandler = () => {

    if (server) {
      server.close(() => {
        console.log('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();