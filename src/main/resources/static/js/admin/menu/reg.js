function InputFileList(input){
    this.input = input;
}
InputFileList.prototype = {
    add:function(file){
        var dt = new DataTransfer(); //데이터를 담을수 있는 객체
        var files = this.input.files;

        for(file1 in files)
            dt.items.add(file1);
            
        // 추가로 담는 파일
        dt.items.add(file);

        this.input.files = dt.files;
    }
};

window.addEventListener("load", function () {
  var menuAdd = document.querySelector("#menu-add"); //#을 쓰면 id값을 불러올수 있다
  var imgInput = menuAdd.querySelector(".img-input");
  var previewPanel = menuAdd.querySelector(".preview-panel");
  var imgLabel = menuAdd.querySelector(".img-label");


//   var test = this.document.querySelector(".img-input");
// var queryButton = this.document.getElementsByClassName("img-input")[0];


imgInput.oninput = function (e) { //input 입력이 완료되었을때
    // imgInput
    for (const key in imgInput.files[0]) 
        console.log(key,":",imgInput.files[0][key]);
            
    var file = imgInput.files[0];
   

    if(file.type.indexOf("image/")!=0){ //타입 제약
        alert("이미지만 업로드 할수 있습니다")
        return;
    }

    if(file.size > 3000*1024) { //크기 제약
        alert(file.size)
        alert("3MB 용량 제한을 초과했습니다")
        return;
    }

    var reader = new FileReader(); //업로드한 파일정보를 읽어준다
    reader.onload = function(e) {
        var img = document.createElement("img");
        img.src = e.target.result;

        previewPanel.append(img); //previewPanel 돔 객체에 img 돔 객체를 넣는다

        setTimeout(()=>{
            img.classList.add("slide-in") //img 객체를 넣는것과 슬라이드 클래스를 넣어주는 코드 사이에 간극이 너무 짧아서 제대로 동작하지 않을수있기에 지연시간ms을 넣어준다 
        },10);

    };
    reader.readAsDataURL(file);

    console.log("hello");
  };

  //드래그 앤 드랍 기능 구현
  imgLabel.ondragenter = function(e) { //드랍존으로 들어올때
    console.log("enter")
  }

  imgLabel.ondragleave = function(e) { //드랍존을 나갈때
    imgLabel.classList.remove("valid");
    imgLabel.classList.remove("invalid");

    console.log("leave")
  }

  imgLabel.ondragover = function(e) { //드랍존 안에서 움직일때
    e.stopPropagation();
    e.preventDefault();
    console.log("over")

    var valid = e.dataTransfer &&
                e.dataTransfer.types &&
                e.dataTransfer.types.indexOf("Files") >= 0;

    if(valid)
        imgLabel.classList.add("valid");
    else
        imgLabel.classList.add("invalid");

  }

  imgLabel.ondrop = function(e) { //드랍존에서 놓을때
    e.stopPropagation();
    e.preventDefault();

    for (var k in e.dataTransfer) {
        console.log(k)
    }
    console.log(e.dataTransfer.types);
    
    var file = e.dataTransfer.files[0];

    // imgInput.files = e.dataTransfer.files[0]; //input태그 파일속성에 드랍존에서 놓은 파일을 추가시킨다
    // imgInput.files.add(e.dataTransfer.files);
    InputFileList.add(e.dataTransfer.files);



    if(file.type.indexOf("image/")!=0){ //타입 제약
        alert("이미지만 업로드 할수 있습니다")
        return;
    }

    if(file.size > 3000*1024) { //크기 제약
        alert(file.size)
        alert("3MB 용량 제한을 초과했습니다")
        return;
    }

    var reader = new FileReader(); //업로드한 파일정보를 읽어준다
    reader.onload = function(e) {
        var img = document.createElement("img");
        img.src = e.target.result;

        previewPanel.append(img); //previewPanel 돔 객체에 img 돔 객체를 넣는다

        setTimeout(()=>{
            img.classList.add("slide-in") //img 객체를 넣는것과 슬라이드 클래스를 넣어주는 코드 사이에 간극이 너무 짧아서 제대로 동작하지 않을수있기에 지연시간을 넣어준다 
        },10);

    };
    reader.readAsDataURL(file);
  }
});
