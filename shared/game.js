console.log("test game");
let socket = new WebSocket("ws://192.168.0.29:99");

socket.onopen = function(e) {
    console.log("Open socket");
    socket.send("hello");
};

socket.onmessage = function(evt) {
    console.log(evt);
};

socket.onclose = function(evt) {
    if(evt.wasClean) {
        console.log(`Clean close, code=${evt.code} reason=${evt.reason}`)
    } else {
        console.log("Connection died");
    }
};

socket.onerror = function(err) {
    console.error(err);
};
