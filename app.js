// array that holds todo list items
let todoItems = [];

// Render the ToDo on the page 
function renderTodo(todo) {
// prevents the todo from clearing on refresh. Stores in localstorage.
localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));    
// Select the first element with the class js-todo-list
    const list = document.querySelector('.js-todo-list');
// select current todo item in DOM
    const item = document.querySelector(`[data-key='${todo.id}']`);  
// If clicked remove the item from the DOM
if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = '';
    return
}
// apply ternery operator to isChecked 
    const isChecked = todo.checked ? 'done': '';
// create an li and assign to node
    const node = document.createElement("li");
// set the class atribute
    node.setAttribute('class', `todo-item ${isChecked}`);
// set the data-key attribute to the id of the todo
    node.setAttribute('data-key', todo.id);
// setup the contents of the li element
    node.innerHTML = `
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
        </button> 
    `;

// If the item already exists in DOm
    if (item) {
// replace it        
        list.replaceChild(node, item);
    } else {
// Else append it to the end of the list
    list.append(node);
    }
}

// Adds text input, and pushes into todoItems array
function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo);
    renderTodo(todo);
}

function toggleDone(key) {
// find index is an array method that returns the position of an element in an array
        const index = todoItems.findIndex(item => item.id === Number(key));
// locates the todo item in todoItems and checks property, if true, turns to false and vice versa.
        todoItems[index].checked = !todoItems[index].checked;
        renderTodo(todoItems[index]);
}

function deleteTodo(key) {
// find todo in array
        const index = todoItems.findIndex(item => item.id === Number(key));
// create new object with properties of the current todo 
        const todo = {
            deleted: true,
            ...todoItems[index]
        };
// remove the todo item from the array
        todoItems = todoItems.filter(item => item.id !== Number(key));
        renderTodo(todo);
}

// Select the form element
const form = document.querySelector('.js-form');

// add submit event listenere
form.addEventListener('submit', event => {
// prevents page refresh on form submission    
    event.preventDefault();
// select the text input
const input = document.querySelector('.js-todo-input');
// get the value of the input and remove whitespace
const text = input.value.trim();
if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
    }
});

// select the entire list
const list = document.querySelector('.js-todo-list');
// add click event to the list
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key; 
        toggleDone(itemKey);
    }

// check to see if item contains the delete icon
    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

// Render the saved list to localStorage
document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach(t => {
        renderTodo(t);
    });
    }
});



