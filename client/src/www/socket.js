import { io } from "socket.io-client";

const socket = io((process.env.NODE_ENV === 'DEVELOPMENT' ? 'http://localhost:5000' : '/backend'), {transports: ['websocket'] , autoConnect:false});
export default socket;