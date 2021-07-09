//Document Object Module
//자바스크립트가 내 html에 있는 모든 요소를 가져와 객체로 만들 수 있다.

//자바스크립트로 html을 조작할 수 있다!
const title = document.getElementById("title");
title.innerHTML="Hi! from JS";

//console.log(document);
//title.style.color = "brown";

document.title="I own you now";

const title2=document.querySelector("#title");
title2.innerHTML="Hi From JS";



function handleResize(){
    console.log("I have been resized");
}

//윈도우 사이즈가 변경될 때 함수를 호출
window.addEventListener("resize", handleResize);


const CLICKED_CLASS = "clicked";

function handleClick(){
   // const hassClass = title.classList.contains(CLICKED_CLASS);
   // if(!hassClass){
   //     title.classList.add(CLICKED_CLASS);
   // }else{
  //      title.classList.remove(CLICKED_CLASS);
   // }
   title.classList.toggle(CLICKED_CLASS);
}


function init(){
    title.addEventListener("click", handleClick);
}
init();