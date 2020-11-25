let lookup = () =>{
    socket.emit('lookup');
}
 lookup();

socket.on("slot lookup", (used, max) => {
    console.log("lookup");
    document.getElementById("pChannel").innerHTML = "Public Channel (" + used + " / " + max + ")";
    $("pChannel").text();
});

// handles usernames and redirections
$('#publicForm').submit(function(e){
    e.preventDefault(); // prevents page reloading
    username = $('#username').val();

    // Prevent to short usernames
    if(username.length < 5) {
        alert("Du kannst keinen Namen mit weniger als 5 Zeichen haben!");
        $("#publicForm").disable();
        location.reload();
    }

    // Prevent to long names
    if(username.length > 25){
        alert("Du kannst keinen Namen mit mehr als 25 Zeichen haben!");
        $("#publicForm").disable();
        location.reload();
    }
    // After all data has been entered submit everything back to the server for proccessing
    location.href = "chat?u="+username;
}); 