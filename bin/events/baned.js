let ban_lookup = (banned, socket) => {
    console.log("ban event called");
    // Looking up all stored remoteaddresses to validate the user not was banned
    for(let i = 0; i < banned.length; i++){
        // If banned tell the client to disconnect
        console.log("Detected baned user")
        socket.emit("banned");
        return false; // Just in case return false out of the function not realy needed tho
    }
}
module.exports = ban_lookup;