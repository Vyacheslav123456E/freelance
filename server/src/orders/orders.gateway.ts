import {SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {OrdersService} from "./orders.service";
import {Socket} from "socket.io";
import {CreateOrdersDto} from "./dto/create-orders.dto";
import {CacheInterceptor, CacheKey, CacheTTL} from "@nestjs/cache-manager";
import {UseInterceptors} from "@nestjs/common";
import {CreateResponseDto} from "./dto/create-response.dto";
import {CreateViewsDto} from "./dto/create-views.dto";

@WebSocketGateway({cors:{
        origin:"http://192.168.20.28:19000", methods: ["GET","POST"],
        credentials: true, transports: ['websocket', 'polling']},
    allowEIO3: true
})
export class OrdersGateway {
    constructor(private ordersService: OrdersService) {}

    @SubscribeMessage('add_order')
    async addOrders(client: Socket, payload: CreateOrdersDto){
        try {
            return  await this.ordersService.setOrder(payload)
        } catch (e) {console.log(e)}
    }

    //@CacheKey('order')
    //@UseInterceptors(CacheInterceptor)
    @SubscribeMessage('get_order')
    async orders(client: Socket){
        try {
            return  await this.ordersService.getOrder()
        } catch (e) {console.log(e)}
    }
    @SubscribeMessage('get_order_id')
    async ordersId(client: Socket, id: number){
        try {
            return  await this.ordersService.getOrderId(id)
        } catch (e) {console.log(e)}
    }
    @SubscribeMessage('get_order_pagination')
    async ordersPagination(client: Socket, payload: any){
        try {
            return  await this.ordersService.getOrderPagination(payload)
        } catch (e) {console.log(e)}
    }
    @SubscribeMessage('set_response')
    async addResponse(client: Socket, payload: CreateResponseDto){
        try {
            return  await this.ordersService.setResponse(payload)
        } catch (e) {console.log(e)}
    }
    @SubscribeMessage('get_response')
    async response(client: Socket, payload: number){
        try {
            return  await this.ordersService.getResponse(payload)
        } catch (e) {console.log(e)}
    }
    @SubscribeMessage('get_count_response')
    async countResponse(client: Socket, payload: number){
        try {
            return  await this.ordersService.getCountResponse(payload)
        } catch (e) {console.log(e)}
    }
    @SubscribeMessage('ref_response')
    async updateResponse(client: Socket, payload: CreateResponseDto){
        try {
            return  await this.ordersService.refResponses(payload)
        } catch (e) {console.log(e)}
    }
    @SubscribeMessage('set_views')
    async views(client: Socket, payload: CreateViewsDto){
        try {
            return  await this.ordersService.setViews(payload)
        } catch (e) {console.log(e)}
    }
}