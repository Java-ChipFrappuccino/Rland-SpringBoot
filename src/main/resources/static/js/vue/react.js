let hello = `asf2324234jqkwrjhkj`
let clickHandler = (e)=>{
    e.preventDefault();
    console.log("클릭~");
}
let calc = function(){    
    return
        <section id="form-section">
            <h1>React 덧셈 계산기</h1>
            <form>
                <fieldset>
                    <legend>계산기 입력폼</legend>
                    <div>
                        <label>x:</label>
                        <input dir="rtl" name="x" value="x"/>
                        <label>y:</label>
                        <input dir="rtl" name="y" value="y"/>
                        <span>=</span>
                        <span>0</span>
                        <span>{hello}</span>
                    </div>
                    <hr/>
                    <div>
                        <input type="submit" name="cmd" value="초기화"/>
                        <input onClick={clickHandler} type="submit" name="cmd" value="계산하기"/>
                    </div>
                </fieldset>
            </form>
        </section>
        
}
ReactDOM.render( calc,
    document.querySelector("#root")
);