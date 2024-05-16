window.addEventListener("load", function(){
    const section = this.document.querySelector("#form-section");
    const xInput = section.querySelector("input[name='x']");
    const yInput = section.querySelector("input[name='y']");
    const initSubmit = section.querySelector("input[value='초기화']");
    const calcSubmit = section.querySelector("input[value='계산하기']");
    const result = section.querySelector("span[name='result']");


    let x = 3;
    let y = 4;

    xInput.value = x;
    yInput.value = y;

    calcSubmit.onclick = (e)=>{
        e.preventDefault();
        // let result = parseInt(xInput.value) + parseInt(yInput.value);
        let x = parseInt(xInput.value);
        let y = parseInt(yInput.value);
        result.textContent = x+y;
        // let x = xInput
    };
});