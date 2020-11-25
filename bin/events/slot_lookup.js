let slot_lookup = (online_users, conf, socket) => {
    // Return slot values
    socket.emit("slot lookup", Object.keys(online_users).length, conf["slots"]);

    // Check if an emptyslot is avaiable
    if(Object.keys(online_users).length >= conf["slots"]){
        socket.emit("server full");
    }
}

module.exports = slot_lookup;