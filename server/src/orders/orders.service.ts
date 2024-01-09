import {Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Orders} from "./orders.model";
import {CreateOrdersDto} from "./dto/create-orders.dto";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import { Cache } from 'cache-manager';
import {CreateResponseDto} from "./dto/create-response.dto";
import {Responses} from "./responses.model";
import { Sequelize } from 'sequelize-typescript';
import {CreateViewsDto} from "./dto/create-views.dto";
import {Views} from "./views.model";
import {User} from "../users/user.model";
import {where} from "sequelize";

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Orders) private ordersModel: typeof Orders,
        @InjectModel(Responses) private responsesModel: typeof Responses,
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(Views) private viewsModel: typeof Views,
        private readonly sequelize: Sequelize,
        @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async setOrder(dto: CreateOrdersDto){
        try {
            // @ts-ignore
            if (typeof dto.price === 'undefined' || dto.price === 0 || dto.price === null ){
                Object.assign(dto, {price: 'Договрная'})
                Object.assign(dto, {type_price: null})
            }else {
                if (typeof dto.type_price === 'undefined' && dto.type_price !== 'за час') {
                    Object.assign(dto, {type_price: 'за проект'})
                }
            }
            await this.ordersModel.create(dto)
            return //JSON.stringify(await this.ordersModel.findAll())
       } catch (e) {console.log(e)}
    }

    async getOrder(){
        try {
          //  const cache_order: any = await this.cacheManager.get('order');
         //  if (cache_order  === undefined) {
               const count = await this.ordersModel.findAll({
                   attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']]
               })
            const [data] = await this.sequelize.query(
           'WITH count_views as (\n' +
                '  SELECT  order_id,count(order_id) as views FROM "views"\n' +
                '  group by order_id\n' +
                '),\n' +
                'count_response as (\n' +
                ' SELECT  order_id,count(order_id) as response FROM responses\n' +
                '  group by order_id\n' +
                ')\n' +
                'SELECT o.*,coalesce(v.views, 0) as views, ' +
                'coalesce(r.response, 0) as response from orders o\n' +
                'left join count_views v on v.order_id=o.id\n' +
                'left join count_response r on r.order_id=o.id\n' +
                'group by o.id,v.views, r.response order by id DESC LIMIT 10 OFFSET 0'
            );

               //await this.cacheManager.set('order', {count: count, data: data});
              // const cache_order: any = await this.cacheManager.get('order');
              // console.log(cache_order)
               return JSON.stringify({count: count, data: data})
           //}else {
             //  console.log('cache')
          //     return JSON.stringify({count: cache_order.count, data: cache_order.data})
           //}

        } catch (e) {console.log(e)}
    }
    async getOrderId(id: number){
        try {
            const data = await this.ordersModel.findByPk(id)
            return JSON.stringify({data: data})
        } catch (e) {console.log(e)}
    }
    async getOrderPagination(payload: any){
        try {
            const count = await this.ordersModel.findAll({
                attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']]
            })
            const data = await this.ordersModel.findAll({
                attributes: ['id', 'title', 'categories', 'description', 'tags',
                    'price', 'files', 'type_price', 'createdAt', 'responses'],
                order: [['id', 'DESC']],
                limit: payload.page,
                offset: payload.current * payload.page
            });
            return JSON.stringify({count: count, data: data})
        } catch (e) {
            console.log(e)
        }
    }
    async setResponse(dto: CreateResponseDto){
        try {
            const dataResponses = await this.responsesModel.findAll({where: {user_id: dto.user_id,order_id: dto.order_id}})
            if (dataResponses.length === 0){
                await this.responsesModel.create(dto)
            }
        } catch (e) {console.log(e)}
    }

    async getResponse(id: number) {
        try {
            const data: any = await this.responsesModel.findAll({
                    raw : true ,
                    include: [
                        {
                        model: Orders, required: true,
                    },
                        {
                            model: User, required: false
                        }
                    ],
                    where: {user_id: id}
                }
            )
            if (data.length !== 0){
                const user = await this.userModel.findByPk(data[0]['orders.user_id'])
                data.map((el: any) =>{
                    Object.assign(el, {orderUser: {name: user.dataValues.name, email: user.dataValues.email}})
                })
                return JSON.stringify({data: data})
            }
            return JSON.stringify({data: []})
        } catch (e) {
            console.log(e)
        }
    }
    async getCountResponse(id: number){
        try {
            const data = await this.responsesModel.findAll({
                raw: true,
                where: {order_id: id},
                attributes: [[Sequelize.fn('COUNT', Sequelize.col('user_id')), 'count']]
            })
            return JSON.stringify({data: data[0]})
        } catch (e) {console.log(e)}
    }
    async refResponses(dto: CreateResponseDto){
        try {
             let res = await this.responsesModel.update(dto, {where: {id: dto.id}});
             return !!res;
        } catch (e) {console.log(e)}
    }
    async setViews(dto: CreateViewsDto){
        try {
            const dataViews = await this.viewsModel.findAll({where: {user_id: dto.user_id,order_id: dto.order_id}})
            if (dataViews.length === 0){
                await this.viewsModel.create(dto)
            }
        } catch (e) {console.log(e)}
    }
}