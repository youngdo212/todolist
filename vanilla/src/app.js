import Todolist from './todolist.js';
import Todo from './todo.js';

const input = document.querySelector('.input');
const addButton = document.querySelector('.add-button');

const todolist = new Todolist({
  todolist: document.querySelector('.todolist'),
})

const getValue = ({inputElem}) => {
  const value = inputElem.value;
  inputElem.value = "";

  return value;
}

const addItem = () => {
  const todoName = getValue({inputElem: input});

  if(todoName === "") return;

  const todo = new Todo({
    name: todoName,
  })

  todolist.addTodo({todo});
}

addButton.addEventListener('click', addItem);