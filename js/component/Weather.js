import Component from "../core/component.js";

export default class Weather extends Component{
   
    init() {
        this.state = this.props;
    }
    template(){
        if(!Object.keys(this.state.weather).length) return null;

        const { temp, place } = this.state.weather;
        
        return `<span class="place">${place}</span>
                <br>
               <span class="temp">${temp}℃</span>
        `;
    }
}
