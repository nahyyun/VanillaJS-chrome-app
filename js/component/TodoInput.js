import Component from '../core/component.js';

export default class TodoInput extends Component{

    template(){
        const { placeholder } = this.props;
        return `<input class="${this.$target.className}-input" 
                       type="text" 
                       placeholder="${placeholder}"/>`;
    }

    event(){
        const { addTodo } = this.props;
        
        this.$target.addEventListener('keyup', (e)=>{
            if(e.key !== 'Enter') return;
            if(!e.target.value) return;
            addTodo(e.target.value);
        });
    }

}