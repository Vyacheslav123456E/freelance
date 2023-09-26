import {forwardRef, Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Utils} from "../utils";
import {UserService} from "./user.service";
import {JwtModule} from "@nestjs/jwt";
import {UserGateway} from "./user.gateway";


@Module({
    providers: [UserService,Utils,UserGateway],
    imports:[
       // forwardRef(() => AuthModule),
        SequelizeModule.forFeature([User]),
    ],
    exports: [
        UserService,
    ]
})
export class UserModule{}