import {SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {UserService} from "./user.service";
import {Socket} from "socket.io";
import {CreateUserDto} from "./dto/create-user.dto";

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
            return  await this.userService.getRegistration(payload)
        } catch (e) {console.log(e)}
    }
    @SubscribeMessage('login')
    async login(client: Socket, payload: CreateUserDto){
        try {
            return  await this.userService.getLogin(payload)
        } catch (e) {console.log(e)}
    }
}