import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SchedulerService } from './infrastructure/scheduler-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Allow React app to access the NestJS API
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies if needed
  });

  await app.listen(process.env.PORT ?? 3000);

  // Bootstrap the scheduler
  const context = await NestFactory.createApplicationContext(AppModule);
  const standaloneService = context.get(SchedulerService);

  standaloneService.start().catch((err) => {
    console.error('Error in SchedulerService:', err);
    context.close();
  });
}

bootstrap();