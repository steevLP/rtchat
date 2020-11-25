let disconnect = (online_users, io, socket) => {
    // Handles the disconnect, removing of unused client data and errors / crash prevention
    try {
        console.log(`"${online_users[socket.id].name}" with the socketid "${socket.id}" disconnected and was removed from the json list`);
        io.emit('user disconnected', online_users[socket.id].name); 
        delete online_users[socket.id]; // Deletes the user from the user list
    } catch (error) {
        console.log(error);
    }
    console.log("Removal succesfull the new list looks as follows");
    console.log(online_users);
}

module.exports = disconnect;