import express from 'express';
import serverConfig from './config/serverConfig';
import http from 'http';
import { Server } from 'socket.io'
import cors from 'cors';
import roomHandler from './handlers/roomHandler';

const app = express();

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    roomHandler(socket)
    console.log("New user connected");
    
    socket.on("disconnect", ()=> {
        console.log("user disconnected")
    })
})

server.listen(serverConfig.PORT, () => {
    console.log(`Server started at Port: ${serverConfig.PORT}`);
})
