const handle_command = require("./handle_command");
const filter = require("sanitize-html");

const whitelist = ["h1","h2","h3","h4","h5","h6", "blockquote", "cite", "span","img","ul", "ol", "li","small","strong","b","s","u"];

let handle_chat = (io,socket,online_users,msg, username, conf) => {
    try {
      console.log(msg[0]);
      if(msg[0] === conf['prefix']){
        console.log(msg);
        let command = "";
        for(let i = 1; i < msg.length; i++){
          command += msg[i];
        }
        console.log(command);
        let args = command.split(" ");
        console.log(args)
        handle_command(args, io, socket);
      } else {
        if(online_users[socket.id].lastMSG != msg){
          // https://www.npmjs.com/package/sanitize-html
          io.emit('chat message', `<span style="color:${conf["colours"][online_users[socket.id].color]};">${username}</span>: ${filter(msg,{
            allowedTags: ["h1","h2","h3","h4","h5","h6", "blockquote", "cite", "span","img","ul", "ol", "li","small","strong", "em", "b","s","u"],
            allowedAttributes:{ 
              img:[ 'src', 'width', 'height' ],
              h1:[ 'style'], 
              h2:[ 'style'], 
              h3:[ 'style'], 
              h4:[ 'style'], 
              h5:[ 'style'], 
              h6:[ 'style'], 
              span:[ 'style'], 
              p:[ 'style']
            },
            allowedSchemes: ['https'],
            allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ]
          })}`); 
          online_users[socket.id].lastMSG = msg;
          // TODO: Filter Blacklist words and replace them with some censor flag
        } else {
          socket.emit("duplicating message");
          console.log("duplicated message detected: " + msg);
        }
      }
    } catch (error) {
      socket.emit("user not known");
    }
}
  // TODO: colourizing the chat names

module.exports = handle_chat;