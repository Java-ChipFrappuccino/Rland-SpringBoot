window.addEventListener("load", function (e) {
    var a1 = document.querySelector("#a1");
    a1.onclick = function (e) {
        e.preventDefault();

        var nums = new Array();
        // nums[0] = 5;
        // nums[1] = 15;
        // nums[2] = 45;
        nums.push(3);
        nums.push(4);
        nums.push(5);
        nums.push('안녕');
        // nums.unshift('비상');
        console.log(nums);

        var num = nums.pop();
        console.log(nums, num);

        for (var num of nums)
            console.log(num);

        nums.splice(0, 0, 100);
        console.log(nums);

        var exam = new Object();
        exam["kor"] = 30;
        exam.eng = 40;

        console.log(exam);

        var answer = confirm('정말로 삭제하시겠습니까?');
        if (answer)
            alert(answer + "삭제되었습니다");
        else
            alert(answer + '취소되었습니다');

        // var arr = new Array(1,2,nums)
        // console.log(typeof[2]);
        // console.log(typeof[1]);

        // console.log(typeof[2][1]);
        // console.log(arr[2][1]);


        // alert("정말 초기화 하시겠습니까?");
        // var x;
        // alert(x === undefined);
        // alert(x === null);
        // alert(x == undefined);
        // alert(x == null);

    };

    btn.vlaue = 1;
})
function calc() {
    alert('왜클릭?');
    var x, y;
    x = prompt('x 값을 입력하세요', 0);
    y = prompt('y 값을 입력하세요', 0);
    x = parseInt(x);
    y = parseInt(y);

    alert(x + y);
    btn.value = x + y;
}

window.onload = function () {
    btn.onclick = calc;
}