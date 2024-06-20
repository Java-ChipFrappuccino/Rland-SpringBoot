// window.addEventListener("load", function () {
//     const chatWindow = this.document.querySelector("#chat-window");
//     const btnConn = chatWindow.querySelector(".btn-conn");
//     const chatButton = chatWindow.querySelector(".btn-send");
//     const ul = chatWindow.querySelector("ul");
//     const textInput = chatWindow.querySelector(".input-text");
//     const nameInput = textInput.querySelector(".input-name");
//     let sock = null;
//
//
//     const TYPE_CONNECT = 1;
//     const TYPE_MESSAGE = 2;
//
//     btnConn.onclick = function(e){
//         e.preventDefault();
//         alert(nameInput.innerText);
//         // alert("tt");
//         // 웹 소켓 사용법
//         sock = new WebSocket("ws://192.168.0.117/chat");
//         sock.onopen = ()=>{
//             let data = {type:TYPE_CONNECT, username:nameInput.value}
//             sock.send(JSON.stringify(data))
//             let li = `<li>서버에 연결되었습니다.</li>`;
//             ul.insertAdjacentHTML("beforeend", li);
//             textInput.disabled = false;
//         };
//         sock.onclose = ()=>{};
//         sock.onmessage = (e)=>{
//             let li = `<li>${e.data}</li>`;
//             ul.insertAdjacentHTML("beforeend", li);
//         };
//     }
//     chatButton.onclick = function (){
//         if (!sock)
//             return;
//         let data = {type:TYPE_MESSAGE, content:textInput.value}
//         sock.send(JSON.stringify(data));
//     }
// });

// console.log("load1");
//
window.addEventListener("load", function(){
    const chatWindow = this.document.querySelector("#chat-window");
    const connButton = chatWindow.querySelector(".btn-conn");
    const sendButton = chatWindow.querySelector(".btn-send");
    const nameInput = chatWindow.querySelector(".input-name");
    const textInput = chatWindow.querySelector(".input-text");
    const ul = chatWindow.querySelector("ul");
    let sock = null;

    console.log("load");

    const TYPE_CONNECT = 1;
    const TYPE_MESSAGE = 2;

    sendButton.onclick = function(e){

        if(!sock)
            return;

        let data = {type:TYPE_MESSAGE, content:textInput.innerText};

        console.log("send", data);

        sock.send(JSON.stringify(data));
    };

    connButton.onclick = function(){
        console.log("conn", sock);
        sock = new WebSocket("ws://localhost/chat");
        sock.onopen = ()=>{
            let data = {type:TYPE_CONNECT, username:nameInput.value};
            console.log("onopen", data);
            sock.send(JSON.stringify(data));

            let li = `<li>서버에 연결되었습니다.</li>`;
            ul.insertAdjacentHTML("beforeend", li);
            console.log(textInput);
            textInput.disabled = false;
        };
        sock.onclose = ()=>{};
        sock.onmessage = (e)=>{
            console.log("onmessage", e.data);
            let li = `<li>${e.data}</li>`;
            ul.insertAdjacentHTML("beforeend", li);
        };
    }
})