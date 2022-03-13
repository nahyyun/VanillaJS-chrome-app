import Component from "../core/component.js";

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
            if(!e.target.value) return;
            setUser(e.target.value);
            renderName();
        });
    }
}