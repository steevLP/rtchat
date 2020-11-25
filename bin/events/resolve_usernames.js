let resolve_usernames =  (io, online_users) => {
    let usernames = [];
    // Gets all Usernames to hand them to the user for display
    Object.keys(online_users).forEach(user => {
      usernames.push(online_users[user].name);
    });
    io.emit("user list", usernames);
}

module.exports = resolve_usernames;