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
        new Clock({ 
            target: $('.clock') 
        });

        new Weather({
            target: $('.weather'),
            props: { 
                weather: this.state.weather
            }     
        });
        
        if(!this.state.user) {
            new NameInput({
                target: $('.greeting'), 
                props: {
                    setUser: this.setUser.bind(this)
                }
            });
        }
        else{
            this.renderName();

            new TodoInput({ 
                target: $('.todo'), 
                props: {
                    placeholder: 'write a todo', 
                    addTodo: this.addTodo.bind(this)
                }
            });  
            
            new TodoList({
                target: $('.todo-list-wrapper'),
                props: {
                    todoList: this.state.todos,
                    completeTodo: this.completeTodo.bind(this),
                    editTodo: this.editTodo.bind(this),
                    deleteTodo: this.deleteTodo.bind(this),
                    deleteAllTodo: this.deleteAllTodo.bind(this)
                }
            })
        }
    }

    setUser(value){ 
        this.setState({user: value});
        setStorage(USER_LS, this.state.user);
    }

    addTodo(value){
        this.setState({
            todos: [
                ...this.state.todos,
                {id: Date.now(), title: value, done: false}
            ]
        });
        setStorage(TODO_LS, this.state.todos);
    }

    completeTodo(id){
        const todos = this.state.todos.map(todo => 
            todo.id === Number(id) ? { ...todo, done: !todo.done } : todo);
        this.setState({
            todos: [
                ...todos
            ]
        })
        setStorage(TODO_LS, this.state.todos);
    }
    
    editTodo(id, value){
        const todos = this.state.todos.map(todo => 
            todo.id === Number(id) ? {...todo, title: value} : todo);
        this.setState({
            todos: [
                ...todos
            ]
        })
        setStorage(TODO_LS, this.state.todos);
    }

    deleteTodo(id){
        const todos = this.state.todos.filter(todo => todo.id !== Number(id));
        this.setState({
            todos: [
                ...todos
            ]
        })
        setStorage(TODO_LS, this.state.todos);
    }

    deleteAllTodo(){
        this.setState({
            todos: []
        })
        setStorage(TODO_LS, this.state.todos);
    }

    askForCoords(){
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                
                const coordsObj = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                resolve(coordsObj);
            }, 
            (err) => {
                reject(new Error(err.message));
            })
        })
    }

    async getWeather({lat, lon}){
        const res = await fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        
        res.json()
            .then(data => {
                this.setState({
                    weather: {
                        ...this.state.weather,
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
        $('.greeting').innerHTML = `<span class="greeting-title">Hello ${this.state.user} !</span>`;
        $('TodoWrapper').classList.toggle('hide');
    }
}

new App({target: $('#root'),
        props: {
            user: getStorage(USER_LS) ? getStorage(USER_LS) : '', 
            todos: getStorage(TODO_LS) ? getStorage(TODO_LS) : [], 
            weather: {}
        }
});