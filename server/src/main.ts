import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import helmet from "helmet";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  await app.enableCors({ origin: ['http://188.225.9.29:3000'], credentials: true });
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}
start();

