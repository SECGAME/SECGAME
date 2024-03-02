function main() {
    var url = new URL(window.location);
    var args = url.searchParams;

    title = args.get("title");
    msg = args.get("msg");

    if(!title || !msg) {
        title = "MSGBOX TITLE";
        msg = "MESSAGE BOX TEXT";
    }

    document.getElementById("msg-title").innerText = title;
    document.getElementById("msg").innerText = msg;

    history.replaceState({}, null, location.pathname);
}

function ok() {
    if ("referrer" in document) {
        window.location.href = document.referrer;
    } else {
        window.history.back();
    }
}

window.onload = main;
