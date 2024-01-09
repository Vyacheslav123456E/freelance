import socket from "../socket";

export default class OrdersService {
    static async getCategories(){
        return new Promise( (resolve, reject) => {
            socket.emit('categories', (response: string) => {
                resolve(JSON.parse(response))
            })
        })
    }
    static async getCategoriesCascader(){
        return new Promise( (resolve, reject) => {
            socket.emit('categories_cascader', (response: string) => {
                resolve(JSON.parse(response))
            })
        })
    }
    static async addOrder(payload: []){
        return new Promise( (resolve, reject) => {
            socket.emit('add_order', payload ,(response: string) => {
                resolve(JSON.parse(response))
            })
        })
    }
    static async getOrder(){
        return new Promise( (resolve, reject) => {
            socket.emit('get_order' ,(response: string) => {
                resolve(JSON.parse(response))
            })
        })
    }
    static async getOrderId(id: number){
        return new Promise( (resolve, reject) => {
            socket.emit('get_order_id' ,id,(response: string) => {
                resolve(JSON.parse(response))
            })
        })
    }
    static async getOrderPagination(payload: any){
        return new Promise( (resolve, reject) => {
            socket.emit('get_order_pagination', payload, (response: string) => {
                resolve(JSON.parse(response))
            })
        })
    }
    static async setResponse(payload: any){
        return new Promise( (resolve, reject) => {
            socket.emit('set_response', payload, (response: string) => {
                resolve(JSON.parse(response))
            })
        })
    }
    static async getResponse(payload: number){
        return new Promise( (resolve, reject) => {
            socket.emit('get_response', payload, (response: string) => {
                resolve(JSON.parse(response))
            })
        })
    }
    static async getCountResponses(payload: number){
        return new Promise( (resolve, reject) => {
            socket.emit('get_count_response', payload, (response: string) => {
                resolve(JSON.parse(response))
            })
        })
    }
    static async refResponses(payload: {}){
        return new Promise( (resolve, reject) => {
            socket.emit('ref_response', payload, (response: string) => {
                resolve(JSON.parse(response))
            })
        })
    }
    static async setViews(payload: any){
        return new Promise( (resolve, reject) => {
            socket.emit('set_views', payload, (response: string) => {
                resolve(JSON.parse(response))
            })
        })
    }
}