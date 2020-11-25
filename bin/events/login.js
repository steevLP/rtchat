const fs = require("fs");
let login = (io,socket,username,online_users,ban_lookup, slot_lookup, conf, banned) => {
    ban_lookup(banned,socket); // Checks if the connection remoteaddress not is banned
    slot_lookup(online_users,conf,socket)
    // Gets all Usernames to hand them to the user for display
    let usernames = [];
    Object.keys(online_users).forEach(user => {
      if(username == online_users[user].name){
        console.log("duplication detected");
        socket.emit("duplicated username");
        return;
      } else {
        usernames.push(online_users[user].name);
      }
    });
    io.emit('user connected',username);
    socket.emit("login confirmed", "public", null)
    if(online_users[socket.id] != null) {
      socket.emit("duplicated user");
    } else {
      if(!online_users[socket.id]){
        // Stores user information 
        online_users[socket.id] = {
          name: username,
          socket: socket.id,
          ip: socket.conn.remoteAddress,
          id: Object.keys(online_users).length,
          rank: "user",
          color: Math.floor(Math.random() * Math.floor(conf["colours"].length)),
          lastMSG: ""
        }
        socket.emit("user list", usernames);
        console.log(`"${username}" with the socketis "${socket.id}" has connected and was added to the json list`);
      }
    }
}

module.exports = login;