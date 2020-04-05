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

const uri = process.env.ATLAS_URI;
mongoose.connect( process.env.MONGODB_URI || uri, { dbName:"CatDB", useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

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

    socket.on("record", (blob, roomID)=>{
        console.log("recevied recording " + roomID);
        console.log(blob);
        io.to(roomID).emit("voice",blob);
    })

    socket.on("whiteboardUpdate",(roomID,url)=>{
        console.log("whiteboard!")
        socket.to(roomID).emit("whiteboard",url)
    })


})
const classesRouter = require('./routes/classes');

app.use('/classes', classesRouter);

server.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
