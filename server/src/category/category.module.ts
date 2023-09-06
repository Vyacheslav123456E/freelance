import {Module} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {CategoryGateway} from "./category.gateway";
import {SequelizeModule} from "@nestjs/sequelize";
import {Category} from "./category.model";

@Module({
    providers: [CategoryService,CategoryGateway],
    imports:[
        SequelizeModule.forFeature([Category]),
    ],
})
export class CategoryModule {}