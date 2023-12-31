import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from '@nestjs/config';
import {Category} from "./category/category.model";
import {Sub_category} from "./category/sub_category.model";
import {CategoryModule} from "./category/category.module";
import {PermModule} from "./permission/perm.module";
import {OrdersModule} from "./orders/orders.module";
import {Orders} from "./orders/orders.model";
import {User} from "./users/user.model";
import {UserModule} from "./users/user.module";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {CacheInterceptor, CacheModule} from "@nestjs/cache-manager";
import {Birthday} from "./users/birthday.model";
import {Specialization} from "./users/specialization.model";
import {Contacts} from "./users/contacts.model";
import {Responses} from "./orders/responses.model";
import {Invitation} from "./orders/invitation.model";
import {Views} from "./orders/views.model";
import {Roles} from "./users/roles.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 1000,
    }),
  SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Category,Sub_category,Orders,User,Birthday,
               Specialization,Contacts,Responses,Invitation,Views,Roles],
      autoLoadModels: true
    }),
      CategoryModule,
      PermModule,
      OrdersModule,
      UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
