const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket)=>{
    console.log('a user connected');
    socket.on('disconnect', ()=>{
        io.emit('user disconnet' , 'Disconnnected' )
    })

    socket.on('chat message' ,(msg)=>{
        console.log("messgage: " + msg + '\n');
        io.emit('chat message' , msg);
        
    })

})


server.listen(3000)