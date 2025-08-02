import { Server } from "socket.io";

export default function startServer(store) {
  const io = new Server(8090, {
    // optional settings like cors
  });
  console.log("Socket.io server running on port 8090");

    store.subscribe(() => io.emit("state", store.getState().toJS()));
    io.on("connection", (socket) => {
        socket.emit("state", store.getState().toJS());
        socket.on("action", store.dispatch.bind(store));
    });
}
