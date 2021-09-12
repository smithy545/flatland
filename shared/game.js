console.log("test game");


function main() {
    const canvas = document.querySelector("#gameCanvas");
    const gl = canvas.getContext("webgl");

    if(gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload = main;


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
        console.error("Connection died");
    }
};

socket.onerror = function(err) {
    console.error(`WebSocket error: ${err}`);
};
