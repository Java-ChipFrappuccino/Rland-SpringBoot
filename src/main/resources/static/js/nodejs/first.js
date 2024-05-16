let repository = require('./file-repository.js'); //경로명 포함해야함
let fs = require('fs');
let newlec = require('newlec-hello');


console.log(newlec.hello());
let dirList = repository.findAll("../",{typeName:".js"});

let csv = dirList.join(",\n");
// let json;
// let xml;

fs.writeFileSync("./foldlist.txt",csv);

