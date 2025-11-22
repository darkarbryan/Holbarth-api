/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ResponseInterceptor } from './core/interceptors';
import { NestFactory, Reflector } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(
    bodyParser.raw({
      type: 'application/jwt', // <-- se ejecuta SOLO si Content-Type es application/jwt
    }),
  );

  app.use(
    bodyParser.json({
      limit: '10mb',
      type: (req) => {
        const contentType = req.headers['content-type'] || '';
        return contentType.includes('application/json');
      },
    }),
  );

  // (Opcional) urlencoded
  app.use(
    bodyParser.urlencoded({
      limit: '10mb',
      extended: true,
    }),
  );

  app.setGlobalPrefix('api/v1');

  // Cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders:
      'Content-Type, Accept, Authorization, Access-Control-Allow-Origin, ngrok-skip-browser-warning',
    credentials: true,
  });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // O lista de orígenes permitidos
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Accept, Authorization, Access-Control-Allow-Origin',
    );
    next();
  });

  // Interceptores
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
