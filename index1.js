//데이터를 정렬하는 방법 2가지

//array -> ex) 사람1,2,3,..,합친 리스트. object를 array 안에 넣을 수 있다. 
//DB에서 가져온 리스트 데이터라면 array 사용
const daysOfWeek = ["mon","tue","wed","thu", true, 54];

console.log(daysOfWeek);

//object -> ex) 사람1, 사람2,...
const nicoInfo = {
    name:"Nico",
    age:33,
    gender:"Male",
    isHandsome : true,
    favMovies : ["Along the gods", "LOTR"],
    favFood :[
        {
            name:"Kimchi", 
            fatty:false
        }, 
        {
            name:"cheese burger",
            fatty:true
        }]
}

nicoInfo.gender = "Female";

console.log(nicoInfo);
console.log(nicoInfo.gender);


//Function

function sayHello(name, age){
    console.log('Hello!', name, " you have ", age, " years of age.");
}

sayHello("NaHyun", 24);

function sayHello(name, age){
    return `Hello ${name} you are ${age} years old`;
}

const greetNahyun = sayHello("NaHyun", 24);

//객체 안에 함수 정의
const calculator = {
plus: function(a,b){
    return a+b;
}
}

console.log(greetNahyun);
const plus = calculator.plus(5,5);
console.log(plus);