import Component from "../core/component.js";

export default class Clock extends Component{
  
  init(){
    this.start();
  }

  template(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
  
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds}`;
  }
  start(){
    setInterval(() => {
      this.template();
      this.render();
    }, 1000)
  }
}