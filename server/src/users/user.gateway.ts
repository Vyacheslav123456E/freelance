import {SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {UserService} from "./user.service";
import {Socket} from "socket.io";
import {CreateUserDto} from "./dto/create-user.dto";
import {CreateSpecializationDto} from "./dto/create-specialization.dto";
import {CreateContactsDto} from "./dto/create-contacts";

@WebSocketGateway({cors:{
        origin:"http://192.168.20.28:19000", methods: ["GET","POST"],
        credentials: true, transports: ['websocket', 'polling']},
    allowEIO3: true
})
export class UserGateway{
    constructor(private userService: UserService) {};

    @SubscribeMessage('registration')
    async registration(client: Socket, payload: CreateUserDto){
        try {
            return  await this.userService.registration(payload)
        } catch (e) {console.log(e)}
    }

    @SubscribeMessage('login')
    async login(client: Socket, payload: CreateUserDto){
        try {
            return  await this.userService.login(payload)
        } catch (e) {console.log(e)}
    }

    @SubscribeMessage('update-user-information')
    async updateInformation(client: Socket, payload: CreateUserDto){
        try {
            return  await this.userService.setInformation(payload)
        } catch (e) {console.log(e)}
    }

    @SubscribeMessage('update-user-specialization')
    async updateSpecialization(client: Socket, payload: CreateSpecializationDto){
        try {
            return  await this.userService.setSpecialization(payload)
        } catch (e) {console.log(e)}
    }
    @SubscribeMessage('update-user-contacts')
    async updateContacts(client: Socket, payload: CreateContactsDto){
        try {
            return  await this.userService.setContacts(payload)
        } catch (e) {console.log(e)}
    }

    @SubscribeMessage('changing-user')
    async fetchChangingUser(client: Socket, payload: CreateUserDto){
        try {
            return  await this.userService.changingUser(payload)
        } catch (e) {console.log(e)}
    }
}