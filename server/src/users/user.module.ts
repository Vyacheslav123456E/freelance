import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Utils} from "../utils";
import {UserService} from "./user.service";
import {UserGateway} from "./user.gateway";
import {Birthday} from "./birthday.model";
import {Specialization} from "./specialization.model";
import {Contacts} from "./contacts.model";
import {Roles} from "./roles.model";


@Module({
    providers: [UserService,Utils,UserGateway],
    imports:[
       // forwardRef(() => AuthModule),
        SequelizeModule.forFeature([User,Birthday,Specialization,Contacts,Roles]),
    ],
    exports: [
        UserService,
    ]
})
export class UserModule{}