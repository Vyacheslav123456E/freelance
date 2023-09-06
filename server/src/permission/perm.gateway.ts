import {Server, Socket} from "socket.io";
import {Logger} from "@nestjs/common"
import {OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage,
        WebSocketGateway} from "@nestjs/websockets";



@WebSocketGateway({cors:{
        origin:"http://192.168.20.28:19000", methods: ["GET","POST"], credentials: true, transports: ['websocket', 'polling'],},
    allowEIO3: true
})
export class PermGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger('SocketGateway');
    constructor() {}

    @SubscribeMessage('settings')
    async orders(client: Socket,socket_id: string){
        return  //await this.permService.getSettings(client,socket_id)
    }
    public afterInit(server: Server): void {
        return this.logger.log('Init');
    }

    public handleDisconnect(client: Socket): void {
        return this.logger.log(`Client disconnected: ${client.id}`);
    }

    public handleConnection(client: Socket): void {
        return this.logger.log(`Client connected: ${client.id}`);
    }
}