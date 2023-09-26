import {Module} from "@nestjs/common";
import {OrdersService} from "./orders.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {OrdersGateway} from "./orders.gateway";
import {Orders} from "./orders.model";


@Module({
    providers: [OrdersService, OrdersGateway],
    imports: [
        SequelizeModule.forFeature([Orders]),
    ],
})
export class OrdersModule {}