// WARNING: For GET requests, body is set to null by browsers.

function Cookie() {
  this.map = {};

  var cookieDecoded = decodeURIComponent(document.cookie); //component는 utf세팅까지 해준다
  console.log(cookieDecoded);
  var cookieTokens = cookieDecoded.split(";");

  for (c of cookieTokens) {
    var temp = c.split("=");
    var key = temp[0];
    var value = JSON.parse(temp[1]);

    this.map[key] = value;
  }
}

Cookie.prototype = {
  get: function (name) {
    return this.map[name];
  },
  add: function (name, value) {},
  addItem: function (name, item) {
    var list = this.map[name];
    list.push(item);
  },
  set: function (name, value) {},
  save: function () {
    var list = this.map["menus"];
    var size = list.length;
    var lastIndex = size - 1;

    var str = "[";
    for (m of this.map["menus"]) {
      str += JSON.stringify(m); //this.map 돌면서 -> [{id:...},{id:...},{id:...},{id:...},{id:...},{id:...},{id:...}]
      if (m !== list[lastIndex])
        //마지막 항목이 아니면
        str += ",";
    }
    str += "]";

    var encoded = encodeURIComponent(str);
    document.cookie = `menus=${encoded}; path=/;`; //동일한 쿠키를 설정하거나 초기화 하고 싶으면 모든 조건이 똑같아야한다 경로설정등....
  },
  remove: function (name) {},
};

window.addEventListener("load", function () {
  // alert("스크립트 호출");

  // var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  // xhr.addEventListener("readystatechange", function() {
  //   if(this.readyState === 4) {
  //     // var list = JSON.parse(this.responseText);
  //     // alert(list[0].korName);
  //     console.log(this.responseText);
  //   }
  // });

  /** 테스트 함수입니다*/
  // function test(){
  // }
  // test();
  var cookie = new Cookie();
  console.log(cookie.get("menus"));

  var val = decodeURIComponent(this.document.cookie.split("=")[1]); //=로 쪼개면 [0]에는 menus [1]에는 [...]안의 쿠키에 담긴 메뉴들이 json형식의 문자열로 담김
  console.log(JSON.parse(val)[0].korName);

  var queryForm = document.getElementById("query-form");
  var queryButton = queryForm.getElementsByClassName("icon-find")[0]; //찾고자 하는 클래스들의 몇번째 인지 작성
  var queryInput = queryForm.getElementsByClassName("query-input")[0]; //찾고자 하는 클래스들의 몇번째 인지 작성
  var menuCardList = this.document.getElementById("menu-card-list");
  var menuContent = menuCardList.getElementsByClassName("content")[0];
  var categoryFilter = this.document.querySelector(".category-filter"); //css선택자를 사용할수있다!
  var li1 = categoryFilter.querySelector("ul>li:nth-child(2)");

  /* 담기 , 좋아요버튼 클릭 */
  menuContent.onclick = function (e) {
    // if (e.target.tagName != "BUTTON") //방법1
    //   //대문자로만 나오니까 작성시 주의
    //   return;

    let isValid =
      e.target.classList.contains("btn-cart") || //2가지 조건을 한꺼번에 처리하기위해 or연산 사용
      !e.target.classList.contains("icon-heart");

    if (!isValid) return;

    console.log("valid");

    // if (!e.target.classList.contains("btn-cart"))
    // return;

    // if (!e.target.classList.contains("icon-heart"))
    // return;

    //방법2
    // if (!e.target.classList.contains("btn-cart"))
    //   return;
    // cookie.remove("menus"); //쿠키 통째로 지우기
    // cookie.add("new cookie name",/value/ ?); //새로운 이름의 쿠키 만들기
    // cookie.addItem(/name/ "menus",/item/ ?); //쿠키목록에서 하나를 골라서 그 안에 값을 추가하기 /객체를 배열에 넣음
    // cookie.set("menus", ?); //특정 쿠키 목록의 값 통째로 바꾸기
    // cookie.save(); // 쿠키 통째로 바꾸기?

    //아이콘-하트 핸들러
    {
      // /api/menu/-likes, POST
      
    }

    // 버튼-카트 핸들러
    {
      let item = {};
      item.id = e.target.dataset.id;
      item.korName = e.target.dataset.korname;
      item.engName = e.target.dataset.engname;
      item.price = e.target.dataset.price;
      item.regDate = e.target.dataset.regdate;
      item.img = e.target.dataset.img;
      item.categoryId = e.target.dataset.categoryid;

      cookie.addItem("menus", item);
      cookie.save();
      e.preventDefault();
      // alert("담기");
    }
  };

  /* 카테고리 버튼 클릭 */
  categoryFilter.onclick = function (e) {
    console.log(e.target.tagName); //
    if (e.target.tagName != "A")
      //대문자로만 나오니까 작성시 주의
      return;

    e.preventDefault(); //이벤트발생시 그안에 새로운 페이지를 요청하는 태그들을 멈추게함
    console.log(e.target.dataset.id);
    var categoryId = e.target.dataset.id; //정의한 데이터값을 가져온다

    var url = `http://localhost/api/menus?c=${categoryId}&p=1`;

    request(url, function (list) {
      bind(list);
      console.log("검색어 목록 재로드");
    });
  };

  /** 주석 */
  queryButton.onclick = function (e) {
    e.preventDefault(); //클릭이란 이벤트시 그안에 새로운 페이지를 요청하는 태그들을 멈추게함
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onload = function () {
      //콜백함수, xhr.onload 요청한 데이터가 다 도착해서 데이터로 만들어 졌을때
      //   var queryInput = document.getElementById("query-input");

      var list = JSON.parse(this.responseText);
      /* var h1Text = document.createTextNode(list[0].korName);
      var menuSection = document.createElement("section");
      menuSection.className = "menu-card";
      var h1 = document.createElement("h1");
      h1.appendChild(h1Text);
      menuSection.appendChild(h1);
      menuContent.appendChild(menuSection); 구식 방식 쓰지마셈! */

      menuContent.innerHTML = ""; //메뉴컨텐츠의 값이 들어있는 태그의 자식 전부를 공백으로 초기화한다

      // var sectionHTML = ""; //for문 쓸때 썻던것
      // for (x = 0; x < list.length; x++) {
      // list.forEach(menu => {
      for (var menu of list) {
        var sectionHTML = `<section class="menu-card">
      <h1>
          <a class="heading-3" href="detail.html">${menu.korName}</a>
      </h1>
      <h2 class="heading-2 font-weight:normal color:base-5">${menu.engName}</h2>
      <div class="price-block d:flex align-items:flex-end"><span class="font-weight:bold"
              >${menu.price}</span>원<span
              class="soldout-msg ml:auto mr:auto md:d:none">SOLD OUT</span></div>
      <div class="img-block">
          <a href="detail.html"><img
                  src="/image/menu/8.jpg"></a>
      </div>
      <div class="like-block d:flex justify-content:flex-end">
          <a class="icon icon-heart-fill icon-color:base-4" href="">좋아요</a>
          <span class="font-weight:bold ml:1">${menu.likeCount}2</span>
      </div>
      <div class="pay-block d:flex">
          <!-- <a class="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text"
              href="">담기</a> -->
              <form action="/cart/add-menu" method="post">
                  <input type="hidden" name="id">
                  <button class="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text"
                  href="">담기</button>
              </form>
          <a class="icon md:icon:none icon-card icon-color:base-0 color:base-0 btn-type:icon btn-card md:btn-type:text"
              href="">주문하기</a>
      </div>
  </section>`;
        // }; //for문

        //   queryInput.value = list[0].korName;
        //   alert(list[0].korName);
        // menuContent.appendChild(sectionHTML); 원래 문자열은 안되고 객체를 넣어야하지만 문자열을 넣을수 있는 함수가 추가됐다! 밑 코드 참고
        menuContent.insertAdjacentHTML("beforeend", sectionHTML);
      }

      // }); //foeeach문
    }; //onload
    var q = queryInput.value;
    // xhr.open("GET", "http://localhost/api/menus");
    /* xhr.open("GET", "http://localhost/ \
    api/menus"); */ //내려쓰기후 한칸 띄우고 역슬래시해도 되긴한다
    xhr.open("GET", `http://localhost/api/menus?s=${q}&p=1`); //백틱으로 묶으면 내려쓰기해도 상관없다
    //뷰엔진에서 모델을 꽂아넣는것처럼 ${변수명}로 변수를 꽂아넣을수 있다

    xhr.send(); // --> 요청이 가고 --> 요청이 오겠지...
  };

  function request(url, callback, method) {
    method = method || "GET";
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onload = function () {
      var list = JSON.parse(this.responseText);
      callback(list);

      // bind(list);
    };

    xhr.open(method, url); //백틱으로 묶으면 내려쓰기해도 상관없다
    //뷰엔진에서 모델을 꽂아넣는것처럼 ${변수명}로 변수를 꽂아넣을수 있다

    xhr.send(); // --> 요청이 가고 --> 요청이 오겠지...
  }

  function bind(list) {
    menuContent.classList.add("fade-out");
    menuContent.ontransitionend = function () {
      menuContent.classList.remove("fade-out");
      menuContent.ontransitionend = null;

      menuContent.innerHTML = ""; //콘텐츠 안의 html을 공백으로 초기화 한다

      for (var menu of list) {
        var sectionHTML = `
      <section class="menu-card">
      <h1>
          <a class="heading-3" href="detail.html">${menu.korName}</a>
      </h1>
      <h2 class="heading-2 font-weight:normal color:base-5">${menu.engName}</h2>
      <div class="price-block d:flex align-items:flex-end"><span class="font-weight:bold"
              >${menu.price}</span>원<span
              class="soldout-msg ml:auto mr:auto md:d:none">SOLD OUT</span></div>
      <div class="img-block">
          <a href="detail.html"><img
                  src="/image/menu/8.jpg"></a>
      </div>
      <div class="like-block d:flex justify-content:flex-end">
          <a class="icon icon-heart-fill icon-color:base-4" href="">좋아요</a>
          <span class="font-weight:bold ml:1">${menu.likeCount}2</span>
      </div>
      <div class="pay-block d:flex">
          <!-- <a class="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text"
              href="">담기</a> -->
              <form action="/cart/add-menu" method="post">
                  <input type="hidden" name="id">
                  <button class="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text"
                  href="">담기</button>
              </form>
          <a class="icon md:icon:none icon-card icon-color:base-0 color:base-0 btn-type:icon btn-card md:btn-type:text"
              href="">주문하기</a>
      </div>
  </section>`;
        // }; //for문

        //   queryInput.value = list[0].korName;
        //   alert(list[0].korName);
        // menuContent.appendChild(sectionHTML); 원래 문자열은 안되고 객체를 넣어야하지만 문자열을 넣을수 있는 함수가 추가됐다! 밑 코드 참고
        menuContent.insertAdjacentHTML("beforeend", sectionHTML); //sectionHTML문자열을 menuContent값의 beforeend 위치에 삽입한다
      }
    };

    // setTimeout(function(){
    //   menuContent.classList.remove("fade-out");
    //   }, 1000);
  }
});
