let handle_command = (args, io, socket) => {
    switch(args[0].toLowerCase()){
        default:
            socket.emit("chat message", "Dieser Befehl existiert nicht! Gib '/help' für eine Liste an Befeheln ein");
        break;
        case "help":
            let message = "============================== Help Command ==============================<br>Folgende Befehle gibt es:<br> /tableflip: wenn der Tisch drann glaube muss<br> /unflip wenn dir die ordnung nicht gefällt<br>/Help: um das hier zu sehen<br>=========================================================================";
            socket.emit("chat message", message);
        break;
        case "tableflip":
            io.emit("chat message", "(╯°□°）╯︵ ┻━┻");
        break;
        case "unflip":
            io.emit("chat message", "┬─┬ ノ( ゜-゜ノ)");
        break;
    }
}

module.exports = handle_command;