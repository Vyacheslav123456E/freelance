import { io } from "socket.io-client";

const socket = io( "ws://localhost:5001",
    {
        transports: ['websocket','polling'],
        forceNew: true,
        upgrade: false,
        auth: {token: 'Bearer ffgfg'}
    });
export default socket;