socket.on("banned", () => {
    alert("diese ip wurde vom server gepserrt!\nWenn das ein Fehler ist melde dich bei dem administrator");
    socket.disconnect();
    document.querySelector("body").innerHTML = '<h1 style="text-align:center">Diese Ip wurde vom Server gesperrt</h1>';
});
socket.on("server full", () => {
    alert("Alle freien Plätze sind zur Zeit belegt!\nBitte versuche es später nochmal");
    location.replace("/");
})