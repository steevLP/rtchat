let voteban = (bVote,toban) => {
    let id = Math.floor(Math.Random * 999999999);

    if(!bVote[id]){
        bVote[id] = {
            target: toban,
            yes: 1,
            no: 0
        }
    } else {
        voteban(bVote, toban);
    }
}

module.exports = voteban;