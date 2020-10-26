let allTodos = [];

allTodos.sort((a, b) => (a.category > b.category ? 1 : -1));

const listDiv = document.querySelector("#listDiv");
const todoList = document.querySelector("#todo-list");
const todoInput = document.querySelector("#todo-input");
const todoButton = document.querySelector("#todo-button");
const categoryButton = document.querySelector("#category");
const hideDoneTodos = document.querySelector("#hide-done-todos");
const showDoneTodos = document.querySelector("#show-done-todos");
const completeButton = document.querySelector(".completed-btn");
const addCategoryButton = document.querySelector(".custom-input-button");
const listOfCat = document.querySelector(".list-of-categories");

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener("click", addTodosToList);
todoList.addEventListener("click", deleteCheck);
hideDoneTodos.addEventListener("click", hideTodos);
showDoneTodos.addEventListener("click", showTodos);
addCategoryButton.addEventListener("click", addCategory);
listOfCat.addEventListener("click", chooseCategory);

function chooseCategory(event) {
  console.log(event.target.innerHTML);
  categoryButton.innerText = event.target.innerText;
}

function showTodos() {
  [...document.querySelectorAll(".completed")].forEach(function (e) {
    if (["completed"].includes(e.classList)) {
      e.style.display = "none";
    } else {
      e.style.display = "flex";
    }
  });
}

function hideTodos() {
  [...document.querySelectorAll(".completed")].forEach(function (e) {
    if (["completed"].includes(e.classList)) {
      e.style.display = "flex";
    } else {
      e.style.display = "none";
    }
  });
}

function displayTodos(array) {
  const allTodosList = document.createElement("div");
  allTodosList.classList.add("all-todos");

  array.forEach((element) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = `${element.todo} - ${element.category}`;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");

    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    todoDiv.appendChild(trashButton);

    allTodosList.appendChild(todoDiv);
    
  });

  todoList.appendChild(allTodosList);
}

displayTodos(allTodos);

function displayTodo(todo) {
  const newTodoList = document.querySelector(".all-todos");

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = `${todo.todo} - ${todo.category}`;
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  //add todo to local storage
  saveLocalTodos(`${todo.todo} - ${todo.category}`);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-btn");

  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");

  todoDiv.appendChild(trashButton);

  newTodoList.appendChild(todoDiv);

  todoList.appendChild(newTodoList);
}

function addTodosToList() {
  newTodo = {};
  newTodo.id = allTodos.length + 1;
  newTodo.todo = todoInput.value;
  newTodo.complete = false;
  newTodo.category = categoryButton.innerHTML;

  allTodos.push(newTodo);

  console.log(allTodos);

  todoInput.value = "";

  displayTodo(newTodo);
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    
    todo.remove();
    removeLocalTodos(todo)
  }

  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function addCategory() {
  const categoryMenu = document.querySelector(".list-of-categories");
  const newCategory = document.createElement("a");
  const newCategoryInput = document.querySelector("#category-input");

  newCategory.innerText = newCategoryInput.value;
  newCategory.classList.add("dropdown-item");
  newCategory.setAttribute("id", "cat");
  categoryMenu.appendChild(newCategory);

  newCategoryInput.value = "";
}

function saveLocalTodos(todo) {
  //check if already have todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //check if already have todos
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    const newTodoList = document.querySelector(".all-todos");

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");

    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    todoDiv.appendChild(trashButton);

    newTodoList.appendChild(todoDiv);

    todoList.appendChild(newTodoList);
  });
}


function removeLocalTodos(todo) {
    //check if already have todos
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    console.log(todo.children[0].innerText)
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}