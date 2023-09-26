import {Server, Socket} from "socket.io";
import { SubscribeMessage,WebSocketGateway} from "@nestjs/websockets";
import {CategoryService} from "./category.service";


@WebSocketGateway({cors:{
        origin:"http://192.168.20.28:19000", methods: ["GET","POST"],
        credentials: true, transports: ['websocket', 'polling']},
        allowEIO3: true
})
export class CategoryGateway {

    constructor(private categoriesService: CategoryService) {}

    @SubscribeMessage('categories')
    async orders(client: Socket){
        return  await this.categoriesService.getCategories()
    }
    @SubscribeMessage('categories_cascader')
    async ordersCascader(client: Socket){
        return  await this.categoriesService.getCategoriesCascader()
    }
}