import { $ } from '../utils/dom.js';
import Component from '../core/component.js';

export default class TodoInput extends Component{

    template(){
        const { placeholder } = this.props;
        return `<input class="${this.$target.className}-input" 
                       type="text" 
                       placeholder="${placeholder}"/>`;
    }

    event(){
        const { user, addTodo } = this.props;
        this.$target.addEventListener('keyup', (e)=>{
            if(e.key !== 'Enter') return;
            if(!user) {
                window.alert('이름을 먼저 입력해주세요!');
                return;
            }
            if(!$(`.${this.$target.className}-input`).value) return;
            addTodo($(`.${this.$target.className}-input`).value);
        });
    }

}