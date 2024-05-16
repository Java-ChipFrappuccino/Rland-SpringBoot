import Calc from "./calc.js";
const { createApp } = Vue;

createApp({
  components: { //다른 데이터 컴포넌트들을 가져와서 쓸수 있다(현재는 임포트로 받은 calc)
    Calc
  }
}).mount(".holder");
