import {Module} from "@nestjs/common";
import {OrdersService} from "./orders.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {OrdersGateway} from "./orders.gateway";
import {Orders} from "./orders.model";
import {Responses} from "./responses.model";
import {Invitation} from "./invitation.model";
import {Views} from "./views.model";
import {User} from "../users/user.model";


@Module({
    providers: [OrdersService, OrdersGateway,],
    imports: [
        SequelizeModule.forFeature([Orders,Responses,Invitation,Views,User]),
    ]
})
export class OrdersModule {}