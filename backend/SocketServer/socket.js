
let users = [];

const addUser = (userId,socketId)=>{
    !users.some(user => user.userId === userId) && users.push({userId,socketId});
}

const removeUser = (socketId)=>{
    users = users.filter(user => user.socketId !== socketId);
}

const connect = (socket) => {
    console.log("a new user connected!");


    socket.on("addUser", userId=>{
        if(userId) addUser(userId,socket.id);
        socket.emit("getusers",users);
    })
    
    
    socket.on("disconnect", () =>{
        console.log("a user disconnected!")
        removeUser(socket.id);
        socket.emit("getusers",users);
    })
};

module.exports = connect