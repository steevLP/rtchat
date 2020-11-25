var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(
  http, 
  {
  path: "/socket.io",
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelayMax:5000 
});
var conf = require("./bin/json/config.json");

// requiring events
let ban_lookup = require("./bin/events/baned");
let slot_lookup = require("./bin/events/slot_lookup");
let login = require("./bin/events/login");
let resolve_usernames = require("./bin/events/resolve_usernames");
let disconnect = require("./bin/events/disconnect");
let handle_chat = require("./bin/events/handle_chat");

// Telemetry Objects
console.log("Serving Dataobjects for Telemetry");
let online_users = {};
let bVote = {}; // Object that handles Vote Actions
let disturbers = {}; // host:ip, amount:int, reasons:array
let banned = require("./bin/json/baned.json");
// TODO: reset last message of each user after a specified time
// TODO: Fixing issues causing removal of clients from the json object

console.log("[SYS-INFO]: Creating Web-Server Routing");
app.get('/', (req, res) => { res.sendFile(__dirname+ '/bin/views/index.html'); }); // The Display
app.get('/chat', (req, res) => { res.sendFile(__dirname+ '/bin/views/chat.html'); }); // The Display

// Static Directories
console.log("[SYS-INFO]: Opening file paths");
app.use('/assets', express.static('assets'));

// setInterval( () => { }, 1000);

// Connection and Event Management
console.log("[SYS-INFO]: Enabling Connector");
io.on('connection', (socket) => {
  // Connection and socketasignment
  console.log("[SYS-INFO]: Setting up Socket Handling for socket: " + socket.id);

  // Checks if the connection remoteaddress not is banned and if a slot is avaiable
  socket.on('lookup', () => { slot_lookup(online_users, conf, socket); ban_lookup(banned['baned'],socket); });
  socket.on("login", (username) => { login(io, socket, username, online_users, ban_lookup, slot_lookup, conf, banned['baned']); });
  socket.on('update userlist', () => { resolve_usernames(io, online_users); });   // Updating usernames while online
  socket.on("disconnect", () => { disconnect(online_users, io, socket); console.log("Disabling Socket Handling for: " + socket.id); }); // Disconnect Handling
  socket.on('chat message', (msg, username) => { handle_chat(io,socket,online_users,msg,username, conf); });  // Chat handling
});

// server listener
console.log("[SYS-INFO]: Starting Server");
http.listen(conf['port'], () => { console.log('listening on *:'+conf['port']); });