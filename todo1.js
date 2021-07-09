const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"; //to do localstorage

const toDos = [];


//toDos 배열을 localStorage에 저장
//localStorage에는 string만 저장 가능
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //자바스크립트 object를 string으로 변경해 줌. array도 객체다!!!!
}

//입력된 todo값을 ul(toDoList)에 넣고 객체(toDoObj)로 생성
//html요소를 가져오는 것뿐만 아니라 직접 만들 수 있다!
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;
    delBtn.innerText = "X";
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId; //li에 id 부여
    toDoList.appendChild(li);
    
    //객체 생성
    const toDoObj = {
        text: text,
        id: newId
    }

    toDos.push(toDoObj); //toDos 배열에 하나의 element 넣기
    saveToDos();

}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue); //화면에 출력하기
    toDoInput.value="";
}

function loadToDos(){
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos); //string 형태로 출력되는 loadToDos를 json을 통해 object 형태로 변경. 
        //데이터를 전달할 때 자바스크립트가 다룰 수 있도록 object로 바꿔주는 기능. object -> string / string -> object
    
        //localstorage에 저장된 toDos키의 값들(value) 가져와서 화면에 출력하기
        //forEach는 array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜 줌.
        parsedToDos.forEach(function(toDo) {//함수 생성 -> pasredToDos에 있는 것들을 각각에 대해 실행시켜줄 함수
            paintToDo(toDo.text);
        }); 
    } 
}
function handledelete(event){
    event.preventDefault();
    const deleteToDos = localStorage.getItem(TODOS_LS);
    deleteToDos.id
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
    toDoForm.toDoList.delBtn.addEventListener("click", handledelete);
}
init();
