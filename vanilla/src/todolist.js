export default class Todolist {
  constructor({todolist}) {
    this._elTodolist = todolist;
  }

  addTodo({todo}) {
    todo.bindRemoveTodo(this._removeTodo.bind(this));
    this._elTodolist.appendChild(todo.getElement());
  }

  _removeTodo(elTodo) {
    this._elTodolist.removeChild(elTodo);
  }
}