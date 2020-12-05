// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

// Functions
function addTodo(event) {
  event.preventDefault();
  makeTodo(todoInput.value);

  // Add todo to localstorage
  saveLocalTodos(todoInput.value);

  // Clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // Delete item
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  // Check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function makeTodo(todoValue) {
  // Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li tag
  const newTodo = document.createElement("li");
  newTodo.innerText = todoValue;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Check mark button
  const compltedButton = document.createElement("button");
  compltedButton.innerHTML = '<i class="fas fa-check"></i>';
  compltedButton.classList.add("complete-btn");
  todoDiv.appendChild(compltedButton);

  //Check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append to list
  todoList.appendChild(todoDiv);
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
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
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    makeTodo(todo);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const eraseItem = todo.children[0].innerText;
  todos.splice(todos.indexOf(eraseItem), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
