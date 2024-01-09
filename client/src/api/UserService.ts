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
    static async updateInformation(payload: []) {
        return new Promise((resolve, reject) => {
            try {
                socket.emit('update-user-information', payload, (response: string) => {
                    resolve(JSON.parse(response))
                })
            } catch (e) {console.log(e)}
        })
    }
    static async updateSpecialization(payload: []) {
        return new Promise((resolve, reject) => {
            try {
                socket.emit('update-user-specialization', payload, (response: string) => {
                    resolve(JSON.parse(response))
                })
            } catch (e) {console.log(e)}
        })
    }
    static async updateContacts(payload: []) {
        return new Promise((resolve, reject) => {
            try {
                socket.emit('update-user-contacts', payload, (response: string) => {
                    resolve(JSON.parse(response))
                })
            } catch (e) {console.log(e)}
        })
    }

    static async fetchChangingUser(payload: {}) {
        return new Promise((resolve, reject) => {
            try {
                socket.emit('changing-user', payload, (response: string) => {
                    resolve(JSON.parse(response))
                })
            } catch (e) {console.log(e)}
        })
    }
}