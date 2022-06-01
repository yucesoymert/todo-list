//selectors
const todoInput = document.querySelector('.todo-input')
const todoAddButton = document.querySelector('.todo-add-button')
const todoList = document.querySelector('.todo-list')
const alertSuccess = document.querySelector('.alert-success')
const alertWarning = document.querySelector('.alert-warning')

//event listeners
todoAddButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
document.addEventListener("DomContentLoaded", function(){
    getTodos();
})

//functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    
    const isEmpty = str => !str.trim().length;

    if (isEmpty(todoInput.value)) {
        alertWarning.style.display = "block";
        setTimeout(() => {
            alertWarning.style.display = "none";
        }, 1500);

        //? clear todo input value
        todoInput.value = "";
    } else {
        alertSuccess.style.display = "block";
        setTimeout(() => {
            alertSuccess.style.display = "none";
        }, 1500);

        saveLocalTodos(todoInput.value);

        //todo div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add("todo")
        todoDiv.classList.add("nohover")

        //create li
        const newTodo  = document.createElement('li')
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        //check mark button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<ion-icon name="checkmark"></ion-icon>'
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton)

        //check trash button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<ion-icon name="trash"></ion-icon>'
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton)

        //append to list
        todoList.appendChild(todoDiv)

        //clear input value
        todoInput.value=""
    }
}

function deleteCheck(event) {
    const item = event.target;

    // check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
        todo.classList.toggle("nohover")

    }

    // delete
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        removeLocalStorage(todo)
        todo.remove()
    }
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach((todo) => {
         //todo div
         const todoDiv = document.createElement('div')
         todoDiv.classList.add("todo")
         todoDiv.classList.add("nohover")
 
         //create li
         const newTodo  = document.createElement('li')
         newTodo.innerText = todoInput.value;
         newTodo.classList.add('todo-item')
         todoDiv.appendChild(newTodo)
 
         //check mark button
         const completedButton = document.createElement('button')
         completedButton.innerHTML = '<ion-icon name="checkmark"></ion-icon>'
         completedButton.classList.add("complete-btn")
         todoDiv.appendChild(completedButton)
 
         //check trash button
         const trashButton = document.createElement('button')
         trashButton.innerHTML = '<ion-icon name="trash"></ion-icon>'
         trashButton.classList.add("trash-btn")
         todoDiv.appendChild(trashButton)
 
         //append to list
         todoList.appendChild(todoDiv)
    })
}

function removeLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[1].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}