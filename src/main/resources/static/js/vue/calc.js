export default {
    data() { //모델을 리턴해줌
        return {
          x:0,
          y:0,
          result:0
        }
      },
      methods:{
        calcSubmitHandler(){ //함수 선언
            // e.preventDefault();
            
            // model을 이용한 mvc 방법
            // one way: v-value two way: v-model
            this.result = this.x + this.y;
            console.log("계산하기");
        }
      },
      template:`
      <section id="form-section">
            <h1>Vue 덧셈 계산기</h1>
            <form>
                <fieldset>
                    <legend>계산기 입력폼</legend>
                    <div>
                        <label>x:</label>
                        <input dir="rtl" name="x" v-model.number="x">
                        <label>y:</label>
                        <input dir="rtl" name="y" v-model.number="y">
                        <span>=</span>
                        <span v-text="result">0</span> <!-- //원본 유지를 위해 이걸 더 많이씀 -->
                        <!-- <span>{{x+y}}</span> -->
                    </div>
                    <hr>
                    <div>
                        <input type="submit" name="cmd" value="초기화">
                        <input type="submit" @click.prevent
                        ="calcSubmitHandler" name="cmd" value="계산하기">
                    </div>
                </fieldset>
            </form>
        </section>
      `
}