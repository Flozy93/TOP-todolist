import { ToDo } from "./todo.js";
import { Project } from "./project.js";

const newProject = new Project("Default project");

const todoButton = document.querySelector("#addTodo");
const projectsContainer = document.querySelector("#projects-container");

// Add To-Do Button
todoButton.addEventListener("click", () => {
  const taskTitle = document.querySelector("#title").value;
  const taskDescription = document.querySelector("#description").value;
  const taskDate = document.querySelector("#dueDate").value;
  const taskPriority = document.querySelector("#priority").value;

  const titleInput = document.querySelector("#title");
  const dueDateInput = document.querySelector("#dueDate");

  titleInput.classList.remove("error");
  // dueDateInput.classList.remove("error");

  let isValid = true;

  if (taskTitle === "") {
    titleInput.classList.add("error");
    isValid = false;
  }

  // if (taskDate === "") {
  //   dueDateInput.classList.add("error");
  //   isValid = false;
  // }

  if (!isValid) {
    return; // Prevent adding todo if validation fails
  }

  const newToDo = new ToDo(taskTitle, taskDescription, taskDate, taskPriority);
  newProject.addTodo(newToDo);

  updateUI();

  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#dueDate").value = "";
  document.querySelector("#priority").value = "Normal";
});

// Function to update UI
function updateUI() {
  projectsContainer.innerHTML = `<h3>${newProject.details.name}</h3>`;

  newProject.details.list.forEach((todo, index) => {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");

    if (!todo.active) {
      todoCard.classList.add("completed");
    }

    todoCard.innerHTML = `
      <h4>${todo.title}</h4>
      <p>${todo.description}</p>
      <p>Due Date: ${todo.getDate(todo)}</p>
      <p><Priority: ${todo.priority}</p>
      <p>Status: ${todo.getTaskStatus(todo)} </p>
      <button onclick="completeTask(${index})">Complete</button>
      <button onclick="removeTask(${index})">Remove</button>
    `;

    projectsContainer.appendChild(todoCard);
  });
}

// Function to Complete a Task
window.completeTask = function (index) {
  newProject.list[index].active = false;
  updateUI();
};

// Function to Remove a Task
window.removeTask = function (index) {
  newProject.list.splice(index, 1);
  updateUI();
};

// Add focus event listeners to clear error when user focuses on input
document.querySelector("#title").addEventListener("focus", () => {
  document.querySelector("#title").classList.remove("error");
});

// document.querySelector("#dueDate").addEventListener("focus", () => {
//   document.querySelector("#dueDate").classList.remove("error");
// });
