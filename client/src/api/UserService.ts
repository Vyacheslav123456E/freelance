import socket from "../socket";

export default class UserService {
    static async api_registration(payload: []) {
        return new Promise((resolve, reject) => {
            try {
                socket.emit('registration', payload, (response: string) => {
                    resolve(JSON.parse(response))
                })
            } catch (e) {console.log(e)}
        })
    }
    static async api_login(payload: []) {
        return new Promise((resolve, reject) => {
            try {
                socket.emit('login', payload, (response: string) => {
                    resolve(JSON.parse(response))
                })
            } catch (e) {console.log(e)}
        })
    }
}