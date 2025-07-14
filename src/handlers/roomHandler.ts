import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid"
import IRoomParams from "../interfaces/IRoomParams";

const rooms: Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = UUIDv4()

        socket.join(roomId)

        rooms[roomId] = [];
        socket.emit("room-created", { roomId })

        console.log('room created with id', rooms);
    }

    const joinedRoom = ({ roomId, peerId } : IRoomParams) => {
        console.log('joined room call', roomId)
        if(rooms[roomId]) {
            
        console.log('new user joined the room', roomId, "with peer id as", peerId)
         rooms[roomId].push(peerId);
         console.log('added peer to room', rooms)
         socket.join(roomId);

         socket.emit("get-users", {
            roomId,
            participants: rooms[roomId]
         })
    }

    }
    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
}

export default roomHandler;