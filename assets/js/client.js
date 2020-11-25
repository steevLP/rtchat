// TODO: Fix / Compensate weird disconnect behavior of the client
// TODO: Annoy user by playing a sound when a new message comes in
let usernames = [];
$(function () {
  let username="";
  let lMessage = "";
  let query = window.location.search.substring(1);
  let qs = url.parse_query_string(query);

  let startup = () => {
    username = qs['u'];
    console.log(username);
    if(username == null || username.length < 5) {
      alert("Dein name ist nicht definiert oder zu kurz!\nDu wirst auf die Startseite zurück gebracht")
      return location.replace("/");
    }

    if(username == null || username.length > 25) {
      alert("Dein Name ist zu lang!\nDu wirst auf die Startseite zurück gebracht")
      return location.replace("/");
    }

    socket.emit("login",username);
  }

  // Initializing the connection to the Server
  startup();

  $('form').submit(function(e){
    e.preventDefault(); // prevents page reloading
    if($('#m').val().length == 0){
      $('#messages').append($('<li style="background-color: #fc5c65; color:white; font-weight:bold; font-style:undeline;">').append(`<span style="font-weight:bold;text-decoration:underline;">System</span> >> Deine Nachricht darf nicht leer sein!`));

      return false;
    }
    socket.emit('chat message',$('#m').val(), username);
    $('#m').val('');
    return false;
  });

  // Automated events
  setInterval(() => { socket.emit("update userlist");},10000);

  // Visualizing error events
  socket.on('duplicating message', () => {
    $('#messages').append($('<li style="background-color: #fc5c65; color:white; font-weight:bold; font-style:undeline;">').append(`<span style="font-weight:bold;text-decoration:underline;">System</span> >> Du kannst keine doppelten Nachrichten schreiben!`));
  });

  socket.on("duplicated username", () => {
    alert("Dein name wurde vom system bereits vergeben\nDeine Verbindung wird getrennt");
    location.replace("/");
  })

  // Visualizing the Event Input
  socket.on('user connected', (username) => { $('#messages').append($('<li style="background-color: #20bf6b; color:white; font-weight:bold; font-style:undeline;">').append(`<span style="font-weight:bold;text-decoration:underline;">System</span> >> <span style="font-weight:bold;text-decoration:underline;">${username}</span> connected`)); });
  socket.on('user disconnected', (username) => { $('#messages').append($('<li style="background-color: #fed330; color:white; font-style:undeline;">').append(`<span style="font-weight:bold;text-decoration:underline;">System</span> >> <span style="font-weight:bold;text-decoration:underline;">${username}</span> disconnected`)); });
  socket.on('user list', (usernames) => { 
    $('#title').text(`Grade online: ${usernames.length}`); 
    this.usernames = usernames;
  });
  socket.on('chat message', (msg) => { 
    $('#messages').append($('<li>').append(msg)); });

    // Scroll to bottom
    var messages = document.querySelector("body");
    messages.scrollTop = messages.scrollHeight;
  });