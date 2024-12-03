import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SchedulerService } from './infrastructure/scheduler-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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