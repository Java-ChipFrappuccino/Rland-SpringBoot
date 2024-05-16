const { createApp } = Vue;

createApp({
  data(){
    return {
        query:"",
        list:[
          {korName:"원주민의 눈물",engName:"ameameame"},
          {korName:"토루쿠막토의 눈물",engName:"avatar"}
        ]
    }
  },
  methods:{
    queryClickHandler(){ //함수 선언
        // e.preventDefault();
        
        // model을 이용한 mvc 방법
        // one way: v-value two way: v-model
        // this.result = this.x + this.y;
        this.list.push({korName:"아마존의 눈물",engName:"amazon"});
        console.log(this.query);
    }
  },
  beforeCreate(){
    console.log("beforeCreate");
  },
  async created(){
    console.log("created");
    let response = await fetch("/api/menus")
    let list = await response.json();
    this.list = list;
    // for (let i = 0; i < list.length-2; i++) {
    //   // console.log(list.length);
    //   this.list.push(
    //     list[i]
    //   );
    // }
  },
  beforeMount(){
    console.log("beforeMount");
  },
  mounted(){
    console.log("mounted");
  },
  beforeUpdate(){
    console.log("beforeUpdate");
  },
  updated(){
    console.log("updated");
  },
  beforeUnmount(){
    console.log("beforeUnmount");
  },
  unmounted(){
    console.log("unmounted");
  },
  activated(){
    console.log("activated");
  },
  deactivated(){
    console.log("deactivated");
  }
}).mount("main");
