const connectToMongo = require('./db');
const express = require('express');
const dotenv = require("dotenv");
// const fileUpload = require('fileupload');

dotenv.config();



var cors = require('cors')

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth",require("./routes/auth"));
app.use("/api/message", require("./routes/message"));
app.use("/api/chat", require("./routes/conversation"));
app.use("/api/profile", require("./routes/profile"));


const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const io = require('socket.io')(server,{
    cors: {
        origin: 'http://localhost:3000',
    }
});

let users = [];

const addUser = (userId,socketId)=>{
    users = users.filter(user => user.userId !== userId);
    users.push({userId,socketId});
}

const removeUser = (socketId)=>{
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (Id) =>{
    return users.find(user=> user.userId === Id);
}


io.on("connection", (socket) => {
    console.log("a new user connected!");

    //add user when someone comes online
    socket.on("addUser", userId=>{
        if(userId) addUser(userId,socket.id);
        io.emit("getusers",users);
    })
    
    // send message to person
    socket.on("sendMessage",({senderId,recipientId,message}) => {
        const reciever = getUser(recipientId);
        
        try{
            io.to(reciever.socketId).emit("getMessage", {
                senderId,
                message
            })
        }
        catch(err){
            console.log(err)
        }

    })

    // disconects when someone leaves
    socket.on("disconnect", () =>{
        console.log("a user disconnected!")
        removeUser(socket.id);
        io.emit("getusers",users);
    })
});



