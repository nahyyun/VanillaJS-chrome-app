import Component from "../core/component.js";

export default class TodoList extends Component{
   
   template(){

       const { todoList } = this.props;
       
       return `
       <div class="sub-info">
        ${todoList.length ? 
            `<span>총 ${todoList.length}개</span>
            <button type="button" class="btn deleteAllBtn">전체삭제</button>`
        : ''}
        </div>
        <ul class="list-box">
        ${todoList.map(todo => {
            return `
            <li data-todo-li-id="${todo.id}" class="todo-li">
                <input type="checkbox" class="btn completeBtn" ${todo.done? 'checked':''}/>
                <label class="todo-label ${todo.done?'done' : ''}">${todo.title}</label> 
                <div class="li-btns">
                    <button class="btn editBtn" type="button">수정</button>
                    <button class="btn deleteBtn" type="button">삭제</button>
                </div>
            </li>`
       })
       .join('')}
       </ul>
       `
   }
   event(){
       const { completeTodo, editTodo, deleteTodo, deleteAllTodo } = this.props;

       this.$target.addEventListener('click', (e)=> {
           if(!e.target.classList.contains('btn')) return;

           if(e.target.classList.contains('deleteAllBtn')){
                deleteAllTodo();
                return;
            }

           const $li = e.target.closest('li');
           const todoId = $li.dataset.todoLiId;
           const prevValue = $li.querySelector('label').innerText;
           
           if(e.target.classList.contains('completeBtn')) {
               completeTodo(todoId);
               return;
           }
           if(e.target.classList.contains('editBtn')){
               const newValue = window.prompt('내용을 입력해주세요!', prevValue);
               if(!newValue || newValue === prevValue) return;
               editTodo(todoId, newValue);
               return;
           }
           if(e.target.classList.contains('deleteBtn')) {
               deleteTodo(todoId);
               return;
           }
       })
   }
}
