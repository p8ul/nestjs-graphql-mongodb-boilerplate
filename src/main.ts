import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

console.log(`Your port is ${process.env.AWS_SECRET_KEY}`);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
