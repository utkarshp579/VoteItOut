import { Server } from "socket.io";

export default function startServer() {
    const io = new Server(8090, {
      // optional settings like cors
    });
    console.log("Socket.io server running on port 8090");
    
}
