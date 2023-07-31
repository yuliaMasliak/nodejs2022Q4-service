import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = await createApi();
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT);
  console.log(`App is listening on port ${process.env.PORT}`);
}
async function createApi() {
  const dir = dirname(__dirname);
  const dirDoc = await readFile(join(dir, 'doc', 'api.yaml'), 'utf-8');

  return parse(dirDoc);
}
bootstrap();
