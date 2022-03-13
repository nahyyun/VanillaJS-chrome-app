import Component from "../core/component.js";
import { $ } from '../utils/dom.js';

export default class NameInput extends Component{
    
    template(){
        return `
        <div class="ask-name">What is your name ?</div>
        <input class="${this.$target.className}-input" 
                       type="text">`;
    }

    event(){
        const { setUser, renderName } = this.props;
        
        this.$target.addEventListener('keyup', (e)=>{
            if(e.key !== 'Enter') return;
            if(!$(`.${this.$target.className}-input`).value) return;
            setUser($(`.${this.$target.className}-input`).value);
            renderName();
        });
    }
}