const fs = require('fs');
const { finished } = require('stream');

function findAll(path,{typeName}){
    let fileList = [];

    if (typeName) {
        let list = fs
            .readdirSync(path,{withFileTypes:true})
        .filter((item)=>item.isDirectory())
        .map((item)=>item.name)


        // .map((item)=>item.replace(".js", ""))  //축약 표현식 , 어차피 리스트에 넣어서 계속 수정하는것이니 변수를 계속 만드는것보단 빌더쓰듯이 한번에 쓰는게 좋다
        // .reduce((pre/*앞에서 집계한 값*/,curItem/*filename*/)=>pre+curItem.length,0); //0은 첫번째 값이 없을경우 초기값 설정

        // let list = fs
        //     .readdirSync(path)
            // .filter((item)=>item.endsWith(".js"))
            // .map((item)=>item.replace(".js", ""))  //축약 표현식 , 어차피 리스트에 넣어서 계속 수정하는것이니 변수를 계속 만드는것보단 빌더쓰듯이 한번에 쓰는게 좋다
            // .reduce((pre/*앞에서 집계한 값*/,curItem/*filename*/)=>pre+curItem.length,0) //3항 연산자로 총합 pre>next? pre : next ; //0은 첫번째 값이 없을경우 초기값 설정

    // fileList = fs.readdirSync(path);

        // let listFiltered = fileList.filter((fileName)=>fileName.endsWith(typeName)); //filter 요녀석을 껴줄까 말까 , 끝나는 문자열로 비교
    // let listFiltered = fileList.filter((fileName)=>fileName.length > 5); //길이로 비교

    // let listMapped = listFiltered.map((fileName)=>fileName.replace(".js", "")) //결과물을 수정하려면 맵에 담아서 수정한다 , 결과물의 문자열을 다른문자열로 대체
    //     let listMapped = listFiltered.map((fileName)=>`<${filename}>`); //결과물의 문자열 수정

    return list;
    }

    return fileList;
}

exports.findAll = findAll;