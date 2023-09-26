import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Orders} from "./orders.model";
import {CreateOrdersDto} from "./dto/create-orders.dto";
import Sequelize from "sequelize";

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Orders) private ordersModel: typeof Orders) {}

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
            return JSON.stringify(await this.ordersModel.findAll())
       } catch (e) {console.log(e)}
    }

    async getOrder(){
        try {
          const count = await this.ordersModel.findAll({
              attributes:  [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']]
          })
            const data = await this.ordersModel.findAll({
              attributes: ['id','title', 'categories','description', 'tags',
                           'price', 'files','type_price','createdAt','views','responses'],
              order: [['id', 'DESC']],
              limit: 10,
              offset: 0
          });
            return JSON.stringify({count: count, data: data})
        } catch (e) {console.log(e)}
    }
    async getOrderId(id: number){
        try {
            const data = await this.ordersModel.findByPk(id)
            return JSON.stringify({data: data})
        } catch (e) {console.log(e)}
    }
    async getOrderPagination(payload: any){
        console.log(payload)
        try {
            const count = await this.ordersModel.findAll({
                attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']]
            })
            const data = await this.ordersModel.findAll({
                attributes: ['id', 'title', 'categories', 'description', 'tags',
                    'price', 'files', 'type_price', 'createdAt', 'views', 'responses'],
                order: [['id', 'DESC']],
                limit: payload.page,
                offset: payload.current * payload.page
            });
            return JSON.stringify({count: count, data: data})
        } catch (e) {
            console.log(e)
        }
    }
}