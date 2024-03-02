function appendScore(rank, username, score) {
    var $tr = document.createElement("tr");

    var $td_rank = document.createElement("td");
    $td_rank.innerText = rank.toString();
    $tr.appendChild($td_rank);

    var $td_username = document.createElement("td");
    $td_username.innerText = username;
    $tr.appendChild($td_username);

    var $td_score = document.createElement("td");
    $td_score.innerText = score.toString();
    $tr.appendChild($td_score)

    document.getElementById("scoreboard-table").appendChild($tr);
}

function main() {
    for(var i = 1; i <= 500; i += 1) {
        appendScore(i, "movptr", 31337);
    }
}

window.onload = main;
