export default class Todo {
  constructor({name}) {
    this._name = name;
    this._state = {done: false};
    this._elTodo = document.createElement('li');
    this._elDeleteButton = document.createElement('button');
    this._elToggleButton = document.createElement('button');

    this._init();
  }
  
  getElement() {
    return this._elTodo;
  }

  getState() {
    return this._state;
  }

  bindRemoveTodo(handler) {
    this._elDeleteButton.onclick = () => {
      const elTodo = this._elTodo;
      handler(elTodo);
    }
  }

  _init() {
    this._addTodoName({
      todo: this._elTodo, 
      name: this._name,
    });

    this._addDeleteButton({
      todo: this._elTodo,
      deleteButton: this._elDeleteButton,
    });

    this._addToggleButton({
      todo: this._elTodo,
      toggleButton: this._elToggleButton,
    })
  }

  _addTodoName({todo, name}) {
    todo.textContent = name;    
  }

  _addDeleteButton({todo, deleteButton}) {
    todo.appendChild(deleteButton);
  }

  _addToggleButton({todo, toggleButton}) {
    toggleButton.onclick = this._toggleState.bind(this);
    todo.appendChild(toggleButton);
  }

  _toggleState() {
    const state = this._state;

    state.done = !state.done;
    this._render();
  }

  _render() {
    this._state.done ? this._elTodo.classList.add('done') : this._elTodo.classList.remove('done')
  }
}