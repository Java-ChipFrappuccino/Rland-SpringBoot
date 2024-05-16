// console.log("첫 npm 프로젝트");
//
// { //초창기 http 방식
// const http = require("http");
// const server = http.createServer((req,resp)=>{ //이런식으로 쓰는게 바람직하다
//     console.log("서버시작");
//     // resp.write("여기는 지구756 응답합니다 engeng");
//     resp.end("여기는 지구756 응답합니다 engeng");
// }).listen(80);

// server.on("request", ()=>{
//     console.log("서버시작");
// });
// server.listen(80); //포트번호
// }

/*{ //connect 방식 (중간 과도기)
    const connect = require("connect"); //서버생성을 도와주는 라이브러리
    const serveStatic = require("serve-static"); //홈 디렉토리를 설정을 도와주는 라이브러리
    const path = require("path"); //path 모듈은 파일 및 디렉토리 경로를 다루는 데 도움이 되는 다양한 메서드를 제공합니다.

    const app = connect();
    app.listen(80);

    app.use(serveStatic(path.join(__dirname, "public"))); //홈 디렉토리를 설정하는법 2

// app.use(serveStatic(__dirname+'public')); //홈 디렉토리를 설정하는법 1

    app.use("/index", (req, resp) => {
        console.log(__dirname);
        resp.end("index page");
    });
    app.use("/menu/list", (req, resp) => {
        // resp.setHeader("Content-Type", "text/plain; charset=utf-8");
        resp.end("menu리스트 페이지");
    });

    console.log("서버가 80번 포트로 시작되었습니다");
}*/

{ //express 방식 (최신방식)
    const express = require("express");
    const path = require("path");
    const ejs = require("ejs");

    const server = express();
    server.set("views", path.join(__dirname,"views"))
    server.set("view engine", "ejs");
    server.use(express.static(path.join(__dirname,"public")))

    server.listen(80);

    server //GET, POST매핑을 설정하려면 이걸로 쓰자
        .route("/index")
        .get((req, resp)=>{
            // resp.send("하하test")
            resp.render("index.ejs",{test: "Hello하이?"})

        });

    // server.use("/index",(req, resp)=>{
    //     resp.end("테스트test");
    // });

    console.log("서버가 80번 포트로 시작되었습니다");

}