import { $ } from '../utils/dom.js';

const IMG_NUM = 4;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    $('body').style.backgroundImage = `url(${image.src})`;
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUM);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();