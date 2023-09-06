import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from '@nestjs/config';
import {Category} from "./category/category.model";
import {Sub_category} from "./category/sub_category.model";
import {CategoryModule} from "./category/category.module";
import {PermModule} from "./permission/perm.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Category,Sub_category],
      autoLoadModels: true
    }),
      CategoryModule,
      PermModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
