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
}