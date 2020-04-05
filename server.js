const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http")


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

var server = http.createServer(app)

var io = require('socket.io')(server)

io.on('connection',(socket)=>{
    console.log("someone connected")

    socket.on("sentComment",(roomID, name, message)=>{
        console.log('sent comment ' + message);
        io.to(roomID).emit("newMessage", name, message);
    })

    socket.on("joinroom",(arg)=>{
        console.log('someone joined ' + arg)
        socket.join(arg)
    })

    socket.on("hand",(roomID,name)=>{
        console.log("hand")
        io.to(roomID).emit("hand",name)
    })

    socket.on("joinnotif",(roomID,name)=>{
        console.log("joinnotif")
        io.to(roomID).emit("joinnotif",name)
    })


})

server.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
