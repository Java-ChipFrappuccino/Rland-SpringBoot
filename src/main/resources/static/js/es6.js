// 여기서 자바스크립트 파일을 가져오기? 불가능... 모듈화는 안된다?? 되는것 같은데..
// Module
import kiki,{test2} /* export default로 설정된것을 가져옴(1개만 가능), 아무이름이나 해도 상관없음, 
그 외에는 { }안에 함수명을 적어주면 사용할수 있다 */  from "gm"; // import 는 최상위 지역(전역)에서 해야한다
import why,{test2 as fake,test3} from './module2.js'; //스크립트 파일마다 중복되는 이름이 있으면 as 를 붙여서 이름을 바꿔줄 수 있다
{
    kiki();
    why();
    test2();
    fake();
    test3();
    let rand = 1;
    if(rand == 1){ // 만약 특정 조건에 따라 동적으로 import를 하고싶다면 이런방식도 가능하긴 하다
        import('./module1.js') //프로미스 객체를 반환함
        .then(({default:woo,test2})=>{
        woo();
        test2();
        });
    }
}
// Promise // 성공, 실패에 대한 이벤트 처리 로직을 분리하게 해주는 객체
{
    {
        //========================ex.20-2=========================
        //                    p r o m i s e 
        // fetch API 사용
        class MenuRepository{
            async findAllPromise(){
                // 네트워크 통신을 포함한 리소스 취득을 위한 인터페이스를 제공하며, 
                // XMLHttpRequest보다 강력하고 유연한 대체제, 아래와 같이 사용
                return await fetch("/api/menus");
            };
    
            async findAllPromise2(){
                let list = await fetch("/api/menus");
                // .json()도 비동기이기 때문에 비동기 처리가 필요함
                let data = await list.json(); 
                p(data);
            };
        }
        let rep = new MenuRepository();
    
        async function printList(){
            let resp = await rep.findAllPromise();
            let list = await resp.json();
            p(list);
        };
        printList();
    
        // rep.findAllPromise2();
        
    }
    
    
    {
        //========================ex.20-1=========================
        //                    p r o m i s e
        // 성공 실패에 대한 이벤트 처리 로직을 별도로 처리하게 해주는 객체
    
        class MenuRepository{
            findAll(resolve){
                //윈도우 객체의 서브객체, 요청 준비
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                
                xhr.onload = function(){
                    const list = JSON.parse(this.responseText);
                    resolve(list);
                }
                const method = "GET";
                const url = "http://localhost/api/menus";
    
                //3번째 인자값은 비동기여부
                xhr.open(method, url);
                xhr.send();
                //요청이 가고 응답이 오면 responseText에 응답이 저장됨
            }
    
            findAllPromise(){
                return new Promise((resolve)=>{
                    const xhr = new XMLHttpRequest();
                    xhr.withCredentials = true;
                    xhr.onload = function(){
                        const list = JSON.parse(this.responseText);
                        resolve(list);
                    }
                    const method = "GET";
                    const url = "http://localhost/api/menus";
                    xhr.open(method, url);
                    xhr.send();
                });
            }
        }
    
        let rep = new MenuRepository();
        //콜백 함수를 정의하는 부분, list는 반환값을 받는 데이터
        rep.findAll((list)=>{
            p(list);
        })
    
        // promise call method 1 : to seperate
        // return후 데이터를 받아서 then을 사용하면 데이터를 받아서 계속 활용할 수 있음
        // 이런거를 미들웨어 시스템이라고 함.
        let pm = rep.findAllPromise();
        pm.then((list)=>{
            return list[0];
        })
        //이렇게 표기도 가능 .then((list)=>return list[0];)
        .then((menu)=>{
            return menu.korName;
        })
        //이렇게 표기도 가능 .then((menu)=>return menu.korName;)
        .then((korName)=>{
            p(korName);
        })
    
        // async와 await 방식
        async function printList(){ //async 비동기
            let rep = new MenuRepository();
            let list = await rep.findAllPromise(); //await 동기화 , 다 될때까지 기다려
            p(list);
            p("===============+^^^^^^^^^^^^^^^^");
        }
        printList();
        console.log("======================",2);
    
    
    
    
        // promise 방식의 비동기 처리함수
        function delayedPrint(val){
            const promise = new Promise((resolve, reject)=>{
                let ran = Math.floor(Math.random()*1000+1000);
                
                setTimeout(()=>{
                    p(val);
                    resolve();
                }, ran);
            });
            return promise;
        }
    
        //pr의 프라미스 작업이 끝나고 나서 처리
        // let pr = delayedPrint("hahaha");
        // pr.then(()=>{
        //     p("after");
        // });
        
        // async와 await를 이용한 동기식 호출이 가능하게 하기
        // await는 비동기 상황에서만 실행 가능
        // (async ()=>{
        //     await delayedPrint("기다리거라");
        //     p("어웨이트 후후");
        //     p("어웨이트 후후1");
        // })();
    }
    
    // 비동기 처리 함수 4 : 서비스 함수 예
        class MenuRepository{
            async findAllPromiseAsync(){
                return await fetch ("/api/menus");
            }
            async findAllPromise(){
                return new Promise((resolve, reject)=>{
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.onload = function () {
                const list = JSON.parse(this.responseText);
                resolve(list);
            };
            const url = `http://localhost/api/menus`;
            const method = "GET";

            xhr.open(method, url);
            xhr.send(); 
            });
        }

            findAll(resolve){
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.onload = function () {
                const list = JSON.parse(this.responseText);
                resolve(list);
            };
            const url = `http://localhost/api/menus`;
            const method = "GET";

            xhr.open(method, url);
            xhr.send(); 
        }
    }

    // async function printList() {
    //     let repository = new MenuRepository();
    //     let list = await repository.findAllPromise();
    //     console.log("리스트 출력값:",list)
    //     }

    async function printList() {
        let repository = new MenuRepository();
        let response = await repository.findAllPromiseAsync();
        let list = await response.JSON();
        console.log("리스트 출력값:",list)
        }

    printList();

    let repository = new MenuRepository();
    // promise call method 1 : to seperate
    let promise = repository.findAllPromise();

    // let promiseAsync = repository.findAllPromiseAsync();
    // console.log("아아아아아아아아",promiseAsync);

    promise
    //fetch 함수가 반환할 때는 response객체를 통해서 상태값도 같이 전달한다.
    .then(response=>response.json()) //이 부분은 fetch 함수를 만든사람의 맘이야...
    .then(list=>{
        console.log("list:",list);
        return list[0];
    })


    promise
    .then((list)=>list[0])
    .then((menu)=>
        //console.log(menu);
        menu.korName)
    .then(korName=>console.log(korName));


    repository.findAll((list)=>{
        console.log(list);
    });
    // 비동기 처리 함수 2 : promise 방식의 비동기 처리함수
        function delayedPrint1(value){

            const promise = new Promise((resolve, reject) => {
                let rand = Math.floor(Math.random() * 2000)+1000;
    
                setTimeout(()=>{
                    console.log(value);
                    resolve(); //성공

                    //reject(); 실패
                }, rand);
            });
            return promise;
        }

        let pr = delayedPrint1("하하하하");

        pr.then(()=>{
            console.log("하하하하 after");
        });

    // 비동기 처리 함수 3 : async와 await를 이용한 동기식 호출이 가능하게 하기

    (async ()=>{
        await delayedPrint1("내 다음은 다 기다려~");
        console.log("기다림의 미학");
    })();




    // 비동기 처리 함수 1 : 콜백 방식의 비동기 처리함수
    function delayedPrint(value,completionHandler, failureHandler){
        let rand = Math.floor(Math.random() * 2000)+1000;

        setTimeout(()=>{
            console.log(value);
            completionHandler();
        }, rand);
    }

    // 이용하는 쪽의 콜백함수의 중첩 등이 복잡하게 느껴 질 수 있다.
    // 함수 하나 호출하는데... 값이 안보인다....
    // 호출하는 함수가 보입니꽈? 아님 코드 구현이 더 눈에 보임니꽈?
    delayedPrint("Hello", ()=>{
        console.log("printed after");
    }, ()=>{console.log("실패~")});
}

// Iterator, Generator (next 메소드를 가지는 iterator 객체를 생성해주는 녀석)
{
    // Generator를 이용한 iterator 구현방법
    class Exam{
        constructor(){
            // this.current = 0;
            this.kor = 10;
            this.eng = 30;
            this.math = 40;
        }
        // * 만 붙이면 next()로 순차적으로 호출할 수 있는 값을 나열 힐수 있다.
        *[Symbol.iterator](){
            yield this.kor;
            yield this.eng;
            yield this.math;
        }

        entries(){
                let [kor,eng,math] = this;
                return {
                    *[Symbol.iterator](){
                        yield ["kor",kor];
                        yield ["eng",eng];
                        yield ["math",math];
                    }
                };
        }
    }

    let exam1 = new Exam();

    for (let [v,k] of exam1.entries()) { //for of문은 자동적으로 Symbol.iterator 이름으로 구현한 메소드를 호출
        console.log("test",(v,k));
    }


    let exam = new Exam();

    for (let n of exam) { //for of문은 자동적으로 Symbol.iterator 이름으로 구현한 메소드를 호출
        console.log("gen",n);
    }

    /* // 맨땅에 iterator 구현
    class Exam{
        constructor(){
            this.current = 0;
            this.kor = 10;
            this.eng = 30;
            this.math = 40;
        }

        [Symbol.iterator](){
            return this;
        }

        next(){
            this.current++;
            switch(this.current){
                case 1:
                    return {done:false, value:this.kor};
                case 2:
                    return {done:false, value:this.eng};
                case 3:
                    return {done:false, value:this.math};
                case 4:
                    return {done:true, value:-1};
            }
        }
    }

    let exam = new Exam();

    for (let n of exam) { //for of문은 자동적으로 Symbol.iterator 이름으로 구현한 메소드를 호출
        console.log("it",n);
    }
    console.log(exam.next());
    console.log(exam.next());
    console.log(exam.next()); */
}


// Set, List, Map Collection
{
    let map = new Map(); //map은 임시객체 forin문은 쓸수없다 왜?
    map.set("id",1);
    map.set("title","Hello");
    map.set("content","Siuuuuuu"); 

    map.forEach((v,k)=>{console.log("foreach:",k,v)}); //foreach는 열거서비스가 없을때 썼던 과거의 유물 forof forin을 쓰자

    for (let [k,v] of map.entries()) { //entries 키와 값을 함께 출력해준다 /뽀개기로 키와 값 배열 출력
        console.log(k,v);
    }
    console.log("map 반복 종료");

    for (let k of map.values()) {
        console.log(k);
    }
    console.log("map 반복 종료");

    //=================================================
    let set = new Set();
    set = new Set([3,5,2,3,4,7,5,3,6]); // 왜 또 new 함??
    console.log(set.size);

    set.delete(5);
    console.log(set.size);

    set.add(10);
    console.log(set.size);

    // set.clear();
    console.log(set.size);

    let exam = {kor:1, eng:23};
    console.log("set iterate...");
    for (let n of set) { //forof문은 이터레이터와 연관되어있다?
        console.log(n);
    }
        console.log("/set iterate...");
}

// Symbol + Computed Property

//Symbol+Computed Property :인터페이스 구현을위한 규격자료형 생성하기
{
    /*Symbol 생성자 : Symbol은 인터페이스 규약에 사용하는 자료형내장객체이다,
    생성할때마다 새로운 Symbol 타입이 생성되어 중첩생성이 불가능하고 new연산자로 생성하지않는다.*/
    const getList = Symbol();
    /*Symbol + Computed Property : 생성된 Symbol에 이름을 부여해 고유의 자료형으로 사용해보기*/
    class NoticeServiceImp {
        [getList](){
            return "list"
        }
    }

    class NoticeController{
        constructor(){
            this.service = new NoticeServiceImp();
        }
        print(){
            console.log(this.service[getList]());
        }
    }

    let controller = new NoticeController();
    controller.print(); // result : "list"

    //---//
    class NoticeService {
        static getList = Symbol();
        static getById= Symbol();
    }
    //심볼을 클래스로 정의해 사용하기...
    class NoticeServiceImp1{
        [NoticeService.getList](){
            return "list"
        }
    }
    //---//
}
//=================================================================================================//

// js에서의 인터페이스 정의

class NoticeService{
    static getList = Symbol();
    static getById = Symbol();
}


class NoticeServiceImp{ //자바스크립트에서는 인터페이스를 타입명이 아닌 정의한 함수명으로 구분한다
    [NoticeService.getList](){
        return "hehehe list";
    }
    [NoticeService.getList](){
        return "hehe getList";
    }
}
let service = new NoticeServiceImp;

console.log(service.getList);

{
    const getList = Symbol();

    class NoticeServiceImp{
        [getList](){
            return "헤헤헿"
        }
    }

    class NoticeController{
        constructor(){
            this.service = new NoticeServiceImp();
        }
        printList(){
            console.log(this.service[getList]()); //궁여지책으로 함수명(키)을 속성으로 쓴다?
        }
    }
    let controller = new NoticeController();
    controller.printList();
}
// Inheritance 상속
{
    class Exam {
            constructor(kor=2,eng=2,math=2){ //constructor 로 매개변수와 필드 기본값을 초기화 해줄수있다
                this.kor=kor,
                this.eng=eng,
                this.math=math
            }
            /** 국,영,수의 총합을 리턴해주는 함수*/
            total(){ // 클래스로 만들게 되면 이제 함수정의시 프로토타입으로 만들필요가 없다
                return this.kor+this.eng+this.math;
            }
        }

    class NewlecExam extends Exam{
        #com
        constructor(){
            super();
            this.#com = 2;
        }
        
        // total(){
        //     return super.total()+this.#com;
        // }

        avg(){
            return (this.total()+this.#com) / 4; //부모를 상속받은 자식클래스에서 this를 쓰면 부모껄 사용할수 있다
        }
    }

    console.log("클래스 상속받기",new NewlecExam().total());
    console.log("평균값 출력",new NewlecExam().avg());
}

// Class 객체지향
{
    // class Exam {
    //     constructor(kor=0,eng=0,math=0){ //constructor 로 매개변수와 필드 기본값을 초기화 해줄수있다
    //         this.kor=kor,
    //         this.eng=eng,
    //         this.math=math
    //     }
    //     /** 국,영,수의 총합을 리턴해주는 함수*/
    //     total(){ // 클래스로 만들게 되면 이제 함수정의시 프로토타입으로 만들필요가 없다
    //         return this.kor+this.eng+this.math;
    //     }
    // }

     // let exam = new Exam();
    // alert(exam.total());
    // alert(typeof Exam); 

    // function createExam() { //펑션의 리턴값으로 클래스를 받고 그 리턴값을 new해서 클래스를 만들수도 있다 태초에 클래스구현을 펑션으로 정의했기에 이런식의 코드도 구현이 가능한것이다
        /* return */ class Exam{
            #kor //private하게 만들 필드값을 #을 포함해 적어준다 객체지향의 캡슐화의 원칙을 지키기 위해 사용하지만 게터,세터를 수동생성 해야하고 코드량이 늘어나므로 그냥 퍼블릭으로 쓰고 싶으면 써도 된다
            #eng
            #math
            static #staticVariable //스태틱 변수 정의

            static {  //스태틱 블록내에서 변수값 초기화
                this.#staticVariable = 30;
            }

            static get staticVariable(){ //스태틱 변수의 값을 얻어내는 게터 함수 작성
                return Exam.#staticVariable; //Exam클래스 안에서 생성한 전역변수이므로 앞에 Exam을 붙여넣어야 한다?
            }

        constructor(kor=0,eng=0,math=0){ //constructor 로 매개변수와 필드 기본값을 초기화 해줄수있다
            this.#kor=kor, //필드값에 #을 붙이면 외부에서 마음대로 접근할수 없게 된다(private) 
            this.eng=eng,
            this.math=math
        }
        getKor(){
            return this.#kor; //게터 세터를 만들어줄수있다
        }
        get kor(){
            return this.#kor; //게터 세터를 더 호출하기 쉽게 만들어줄수있다
        }
        set kor(value){
            this.#kor = value; //게터 세터를 만들어줄수있다
        }
        /** 국,영,수의 총합을 리턴해주는 함수*/
        total(){ // 클래스로 만들게 되면 이제 함수정의시 프로토타입으로 만들필요가 없다
            // return this.kor+this.eng+this.math;
            return this.#kor+this.#eng+this.#math;

        }
    }
// }
   
    // let Test = createExam();
    // let exam = new Test();
    // alert(exam.total());
    // alert(exam.kor); //get,set함수로 만들어져있으면 게터세터 호출없이 바로 쓸수있다
    console.log("스태틱함수 호출",Exam.staticVariable);

}

// Arrow Function
{
    {
        let arr = [2,3,45,2,1,2,3];
        arr.sort((a,b)=>a-b);
        console.log(arr);
        arr.sort((a,b)=>b-a);
        console.log(arr);
    }

    {
        let arr = [[2,3],[45,2],[1,2,3]];
        // arr.sort((a,b)=>a[0]-b[0]);
        // console.log(arr);
        arr.sort((a,b)=>b[0]-a[0]);
        console.log(arr);
    }


    // 하지만... 꼭 그렇게만 볼 것이 아니라 유연하게 사용해야 할 것
    //그러기 위해서라도 차이점을 알아야 하지 않을까요?
    // 차이점 :
    // 1. this, super 가 없다(생성자 또는 멤버 메소드로 사용될 수 없다.) 람다를 쓸지 말지 제일 중요한 기준
    // 2. arguments 콜렉션이 없다.(함수를 이용한 코딩 영역으로 사용하는 것이 아니다?. 코드를 나누는 역할자로 사용하지 않는다.)
    // 3. new.target이 없다. new 연산자로 생성할 수 없다.
    let exam = {
        kor:10,
        eng:20,
        // total:function(){
        //     return this.kor+this.eng;
        // }
        // 퀴즈 1 : 함수를 Arrow Funtion으로 바꿀 수 있을까?
        total:(kor=10,eng=20)=>{
            return kor+eng;
        },
        delayedPrint(){ // exam.delayedPrint() 이 때는 this가? exam 이다.
            // 3초뒤 다음 callback 호출되면 this.kor가 undefined 가 나온다.
            // 그 이유는 함수만 호출했기 때문에 누가? 넘겨 받는 애(setTimeout)가
            // setTimeout(function(){
            //     console.log("딜레이콜", this.kor, this);  
            // }, 3000);
            // 그 대안으로 bind() 메소드를 사용할 수 있지만
            // setTimeout(function(){
            //     console.log("딜레이콜", this.kor, this);  
            // },bind(this), 3000);
            // 그 보다는 Arrow Funtion을 사용하면 깔끔하게 처리할 수 있다.
            setTimeout(()=>{
                console.log("딜레이콜", this.kor , this);
            }, 3000);
            
            let f1 = function(){
                console.log(this);
            }

            // 위에 setTimeout이 3초 뒤 호출하는 모양은 어떤 모양인가?
            // 1. f1(); // this->window
            // 2. exam.f1(); // 이렇게 호출하면 this->exam
            // 3. f1().apply(exam); // this->exam

            

            }
        }

        // 추가적인 내용 apply, call, bind 메소드의 용법과 차이
            //자바스크립트에서 function을 호출하면서 객체를 전달하는 방법을 제공한다.
            function total(a,b){
                console.log("in total",a)
                return this.kor+this.eng;
            }
            // 이렇게 호출된 total에서의 this는 window객체가 된다.
            console.log("total",total());
            // total을 호출하면서 this로 사용할 객체를 전달할 수 있다.
            // 방법 1 : apply를 사용하는 방법
            console.log("apply total",total.apply(exam,["hello","hihi"])); //배열로 매개변수 전달
            // 방법 2 : call 사용하는 방법
            console.log("call total",total.call({kor:100, eng:90},"good","hi")); //하나씩 변수를 전달
            // 방법 3 : bind 사용하는 방법
            // 위의 1, 2 방법은 내가 함수를 호출하는 입장일 때이지만
            // 호출을 부탁(위임)하는 경우에 객체를 지정하고 싶다면
            // 예를 들어 내가 callback 함수를 작성해서 위임하는 경우
            let aa = {
                name:"짜장면",
                closeCallback(){
                    console.log("자장면 이름:",this.name);
                }
            }

            let onclose = aa.closeCallback.bind(aa);

            // 호출자는 어떻게 호출하지? 그냥 위임받은 함수를 참조하는 변수를 이용해서 call 하겠지?
            onclose();


        // 예제 1 : 메소드로 사용할 수 있나?
        // this가 있다는 말은 total()메소드를 호출할 때 exam을 this로 받는다는 것을 말하는 것이다.
        // Arrow Function은 그것(exam)을 안 받는다 아니 못받는다.
        // 따라서 total() 메소드의 연산은 undefined + undefined가 되어서 NaN이 된다.
    
        console.log("===========",exam.total());
        exam.delayedPrint();
    };

    {
        // 예제 2 : 일반 함수로 사용할 수는 있나?
        // function add(a,b){
        //     console.log("add arguments length : ", arguments.length); // 나머지 값도 처리 할 수 있다.
        //     return a+b;
        // }

        // this 쓸일 없고 객체와 관련된 일이 아니라면 코드가 깔끔하고 더 좋아 보인다.
        // 오히려 this를 사용할 수 없던 고전적인 함수를 구현할 때로 돌아간 느낌이라
        // 앞으로는 순수 함수가 필요할 때는 이걸로 ...:-)

        let add = (a,b, ...args)=>{
            // console.log("add arguments length : ", arguments.length); // 나머지 값도 처리 할 수 있다.
            console.log("rest arguments length : ", args.length); // 나머지 값도 처리 할 수 있다.
            return a+b;
        }

        console.log("add(3,4,5):", add(3,4,5));
    }



// Rest Parameters & spread Operator
{
    //나머지 값만 따로 담아줘!!!!
    function sum(n1,n2, ...args){ //...작성후 변수명
        let result = 0;
        //기존에는 나머지 출력을 하려면 이런식으로 작성을 해줘야 했다, 손이 많이 가고 불편하다
        //let length = arguments.length-2; //전달받은 매개변수(아규먼트) 총 길이에서 실제로 사용하는 2개를 빼고 나머지를 구한다
        //for(let i=0; i<length; i++)
            // console.log(arguments[i+2]); //실제로 쓰는 아규먼트2개를 뺀 나머지값을 출력해야하므로 +2를 해준다

        for(let arg of args)
            console.log(arg);

            return n1+n2;
    }

    console.log("sum:", sum(2,3));
    console.log("sum:", sum(2,3,4,5,6,7,8));

    let kors = [20,40,20];
    //spread~~~ by myself
    console.log("sum3:",sum(kors[0],kors[1])) //주는쪽에서 ...spread 받는쪽에서 ...Rest
    //spread~~~ auto
    console.log("sum3:",sum(...kors))
    let arr1 = [2,3,4];
    // let arr2 = [6,5,arr1];
    // arr2[2] //2? or [2,3,4]?
    let arr2 = [6,5,...arr1]; //...을 쓰면 배열에 다른배열의 값들을 spread해준다
    console.log("arr2:",arr2);

    // function add(x, y=10, z){
    //     console.log(x + "," + y + "," + z);
    // }
    // console.log(add(10,null,20))
    // console.log(add(10,undefined,20))

    function getCount(){
        return 3; //쿠키, 로컬저장소, 원격데이터 등등...
    }

    function add(x, y = 10, z = getCount(), a = z+1){ //기본값으로 함수의 값을 받아올수도 있다 , 다른 매개변수의 값을 기본값으로 활용할수도 있다
        //기본값으로 사용된 y는 카운트 될까?
        console.log("매개변수 길이:",arguments.length)
        console.log(x + "," + y);

        //퀴즈 2: 전달된 arguments의 콜렉션에 담긴 값은 별칭 인자의 값이 바뀌면 같이 바뀔까?
        console.log("인자 값을 바꾸기 전 : ",
        x == arguments[0],
        x === arguments[0],
        y == arguments[1],
        y === arguments[1]
        );

        x = 50; //x에 값을 넣는순간 x의 객체가 바뀐다
        y = 60;
        console.log("인자 값을 바꾼 후 : ",
        x == arguments[0],
        x === arguments[0],
        y == arguments[1],
        y === arguments[1]
        );
    }
    console.log("add 10:",add(10))
    console.log("add 10,30:",add(10,30))
    console.log("undefined:",add(undefined))

    function sort (a,b){
        return a - b;
    }

}

//Advanced JSON #5 Array Destructuring
{
    // undefined undefined [10,20,50]
    // let kor1, kor2, kor3 = [10,20,50]; //변수 여러개를 선언하고 그에 맞춰서 값을 넣으려고 했지만 이렇게 하면 맨 마지막 배열에만 값이 담긴다

    // 10 20 50
    // let [kor1, kor2, kor3] = [10,20,50]; //변수 선언부를 배열선언처럼 대괄호로 감싸면 각각의 배열에 값들이 순차적으로 들어간다
    // let [kor1, kor3] = [10,20,50];
    // let [kor1, , kor3] = [10,20,50];
    // console.log("#5" ,kor1, /* kor2,  */kor3);

    let arr = [10,20,50];
    let [kor1, ,kor3] = arr;
    arr[0] = 60;
    //배열의 값을 다시 대입
    [kor1,,kor3] = arr;

    console.log(kor1, kor3);

    //swap
    let x = 3;
    let y = 5;

    console.log("before", x, y);
    // let t = x;
    // x = y;
    // y = t;
    [x,y] = [y,x];
    console.log("after", x, y);
}

//Advanced JSON #4-2 Object Destructuring : Nested
{
    let exam = {kor:20,eng:30,math:40,student:{id:1,name:`홍길동`}};

    // let name = exam.student.name;
    let {kor, student:{name}} = exam; //exam객체 안의 kor과 student로 쪼갰는데 중괄호로 student안에 name으로 한번 더 뽀개준다, 뽀개기 중첩

    console.log(kor, name);
}

//Advanced JSON #4-1 aliasing, matching, changing, ...
{
    // function print(exam){ 
    function print({kor, eng:english, math ,com=90}){ //들어오는 객체에 없는 값도 중괄호 안에 쓰면 지역변수로 생성은 해준다, 다만 값이 없기때문에 undefined가 되고 직접 값을 대입해줄수도 있다

        let total = kor+english+math+com;
        console.log("#4-1" ,kor, english, math, `com:${com}`, total); //문자열안에 변수명을 써서 값을 문자열로 받아올수있다 ${변수명}
    }
    let exam = {kor:10,eng:30,math:40};
    print(exam);

    let exam1 = {kor:10,eng:30,math:40};
    let {kor,eng} = exam1;
    exam1.kor++;
    exam1.eng+=2;

    ({kor,eng} = exam1);

    console.log(exam1, {kor,eng});
}

//Advanced JSON #4 Object Destructuring
{
    function print(exam){ 
    // function print({kor, eng, math}){ //매개변수에 중괄호를 쓰면 알아서 들어오는 객체를 지역변수로 뽀개준다 ,exam객체를 매개변수로 전달받았고 그걸 뽀개줌

        // let total = exam.kor+exam.eng+exam.math;
        // console.log(exam.kor, exam.eng, exam.math, total);

        //낱개로 뽀개기(Destructuring)
        // let kor = exam.kor;
        // let eng = exam.eng;
        // let math = exam.math;
        let {kor,eng,math} = exam; //오른쪽의 객체를 뽀개서 같은이름의 왼쪽 변수명에 담아준다

        let total = kor+eng+math;
        console.log("#4" ,kor, eng, math, total);
    }
    print({kor:10,eng:20,math:30});
}

//Advanced JSON #3 Computed Property
{
    let col = "kor";
    let eng = 40;
    let math = 100;

    let exam = {
        [col+1]:10,
        eng,
        math,
        total(){
            return this.kor1+this.eng+this.math;
        }};
    console.log("#3" ,exam.kor1 , "," , exam.eng,exam.total());
}

//Advanced JSON #2 function
{
    let kor = 30;
    let eng = 40;
    let math = 100;

    let exam = {
        kor,
        eng,
        math,
        total(){
            return this.kor+this.eng+this.math;
        }};
    console.log("#2" ,exam.kor , "," , exam.eng,exam.total());
}

//Advanced JSON #1 function
{
    let kor = 30;
    let eng = 40;
    let math = 100;

    // let exam = {
    //     kor:kor,
    //     eng:eng,
    //     math:math
    // };

    let exam = {kor,eng,math};
    console.log("#1" ,exam.kor + "," + exam.eng);
}

function p(obj){
    console.log(obj);
}