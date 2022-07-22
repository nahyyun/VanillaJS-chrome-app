import { $ } from './js/utils/dom.js';
import {API_KEY} from './js/const/APIKey.js';
import Clock from "./js/component/clock.js";
import { setStorage, getStorage } from './js/store/index.js';
import { USER_LS,TODO_LS, COORDS_LS } from './js/const/storageKey.js';
import NameInput from './js/component/NameInput.js';
import TodoInput from './js/component/TodoInput.js';
import Component from './js/core/component.js';
import TodoList from './js/component/TodoList.js';
import Weather from './js/component/weather.js';

class App extends Component {

    init(){
        this.state = this.props
        this.loadCoords();
    }

    template(){
        return `
        <header>
            <div class="weather"></div>
        </header>
        <content>
            <span class="clock"></span>
            <div class="greeting"></div>
            <TodoWrapper class="hide">
                <div class="todo"></div>
                <div class="todo-list-wrapper"></div>
            </TodoWrapper>
        </content>
        `;
    }

    componentDidMount(){
        new Clock({ target: $('.clock') });

        new Weather({ target: $('.weather'),
                      props: { 
                          weather: this.state.weather
                     }     
        });

        (getStorage(USER_LS)) ? 
        this.renderName()
        :
        new NameInput({ target: $('.greeting'), 
                        props: {
                            setUser: this.setUser.bind(this),
                            renderName: this.renderName
                        }
        });
        
        new TodoInput({ target: $('.todo'), 
                        props: {
                            placeholder: 'write a todo', 
                            addTodo: this.addTodo.bind(this)
                        }
        });  
        
       new TodoList({target: $('.todo-list-wrapper'),
                     props: {
                        todoList: this.state.todos,
                        completeTodo: this.completeTodo.bind(this),
                        editTodo: this.editTodo.bind(this),
                        deleteTodo: this.deleteTodo.bind(this),
                        deleteAllTodo: this.deleteAllTodo.bind(this)
                    }
        })
    }
   
    setData(LS_NAME, key, data){
        this.setState({...this.deepCopy(this.state), [key]: data});
        setStorage(LS_NAME, this.state[key]);
    }

    setUser(value){ 
        this.setData(USER_LS, 'user', value);
    }

    addTodo(value){
        const todos = this.deepCopy(this.state.todos);
        this.setData(TODO_LS, 'todos', [...todos, {id: Date.now(), title: value, done: false}]);
    }

    completeTodo(id){
        const todos = this.deepCopy(this.state.todos);
        const findIdx = todos.findIndex(todo => todo.id == id);
        todos[findIdx].done = !todos[findIdx].done;
        this.setData(TODO_LS, 'todos', todos);
    }
    
    editTodo(id, value){
        const todos = this.deepCopy(this.state.todos);
        const findIdx = todos.findIndex(todo => todo.id == id);
        todos[findIdx].title = value;
        this.setData(TODO_LS, 'todos', todos);
    }

    deleteTodo(id){
        const todos = this.state.todos.filter(todo => todo.id != id)
        this.setData(TODO_LS, 'todos', todos);
    }

    deleteAllTodo(){
        this.setData(TODO_LS, 'todos', []);
    }

    askForCoords(){
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                
                const coordsObj = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }
                resolve(coordsObj)
            }, 
            (err) => {
                reject(new Error(err.message))
            })
        })
    }

    async getWeather({lat, lon}){
        const res = await fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        
        res.json()
            .then(data => {
                this.setState({...this.deepCopy(this.state),
                        weather: {
                            temp: data.main.temp, 
                            place: data.name
                        }
                });
            }).catch(error => new Error(error));
    }

    async loadCoords(){
        const loadedCoords = getStorage(COORDS_LS);
        if(loadedCoords === null){
            const coordsObj = await this.askForCoords();
            setStorage(COORDS_LS, coordsObj);
            this.getWeather(coordsObj);
        }
        else{
            this.getWeather(loadedCoords);
        }
    }

    renderName(){
        $('.greeting').innerHTML = `<span class="greeting-title">Hello ${getStorage(USER_LS)} !</span>`;
        $('TodoWrapper').classList.toggle('hide');
    }

    deepCopy(obj){

        if( obj == null) return;
        
        let copy = Array.isArray(obj) ? [] : {};

        for(let key in obj){

            if(typeof obj[key] == 'object') {
                copy[key] = this.deepCopy(obj[key]);
            }else {
                copy[key] = obj[key];
            }
        }
        return copy;
    }
}

new App({target: $('#root'),
        props: {
            user: getStorage(USER_LS) ? getStorage(USER_LS) : '', 
            todos: getStorage(TODO_LS) ? getStorage(TODO_LS) : [], 
            weather: {}
        }
});