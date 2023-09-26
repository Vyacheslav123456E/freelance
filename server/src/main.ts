import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import helmet from "helmet";
import {json, urlencoded} from "express";
import {NestExpressApplication} from "@nestjs/platform-express";
import path from "path";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());

  app.use(json({limit: '50mb'}));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.enableCors({ origin: ['http://188.225.9.29:3000'], credentials: true });
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}
start();

