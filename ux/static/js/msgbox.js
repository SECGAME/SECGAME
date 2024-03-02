function msgBox(title, msg) {
    var urlParams = new URLSearchParams("?");

    urlParams.append("title", title);
    urlParams.append("msg", msg);

    window.location.href = "/msg.html?" + urlParams.toString();
}
