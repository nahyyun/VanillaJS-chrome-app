export default class Component {
        state
    constructor({ target, props } ){
        this.$target = target
        this.props = props
        this.init()
        this.render()
        this.event()
    }

    init(){}

    template(){
        return '';
    }
    componentDidMount(){}

    render(){
        this.$target.innerHTML = this.template();
        this.componentDidMount();
    }
    event(){
    }
    setState(newData){
        this.state = {...this.state, ...newData};
        this.render();
    }
}