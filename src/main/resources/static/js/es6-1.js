let exam = {kor:10, eng:20, math:30}; //왕자님 : target
console.log("target, kor:", exam.kor);

let logHandler = {
    get(target, prop, receiver) {
        console.log("우하하");
        // return target[prop];
        // return Reflect.get(target, prop, receiver);
        return Reflect.get(...arguments);
        
    },
};

let proxy = new Proxy(exam, logHandler);
console.log("proxy, kor:", proxy.kor);
