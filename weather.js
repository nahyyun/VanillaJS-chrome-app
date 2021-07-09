const weather = document.querySelector(".js-weather");

const API_KEY = "c24620b89f7fa8a3878b67c387a188c3";

const COORDS = 'coords';

function getWeather(lat, lon){
    fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){ //then은 fetch가 된 후 함수 실행할 수 있도록 해줌
          return response.json()
        }).then(function(json){
          const temp = json.main.temp;
          const place = json.name;
          weather.innerText = `${temp}℃ @ ${place}`;
        })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


//getcurrentPosition 성공 했을 때 처리 함수
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //객체의 변수명과 객체의 key값을 같게 저장할 때 이렇게 작성 가능!
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

//getcurrentPosition 실패 했을 때 처리 함수
function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){ //좌표를 요청하는 함수
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();