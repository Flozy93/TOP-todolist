import { ToDo } from "./todo.js";
import { Project } from "./project.js";
import { Portfolio } from "./portfolio.js";

const portfolio = new Portfolio();
let currentProject = new Project("Default project");

portfolio.addProject(currentProject);

const todoButton = document.querySelector("#addTodo");
const projectsContainer = document.querySelector("#projects-container");
const projectSelect = document.querySelector("#project-select");

// Add To-Do Button
todoButton.addEventListener("click", () => {
  const taskTitle = document.querySelector("#title").value;
  const taskDescription = document.querySelector("#description").value;
  const taskDate = document.querySelector("#dueDate").value;
  const taskPriority = document.querySelector("#priority").value;

  const titleInput = document.querySelector("#title");
  titleInput.classList.remove("error");

  let isValid = true;

  if (taskTitle === "") {
    titleInput.classList.add("error");
    isValid = false;
    return;
  }

  const dateNow = new Date();
  const chosenDate = new Date(taskDate);

  if (chosenDate < dateNow) {
    document.querySelector("#dueDate").classList.add("error");
    return;
  }

  if (!isValid) {
    return;
  }

  if (projectSelect.value === "new") {
    const newProjectName = prompt("Enter new project name");
    if (newProjectName) {
      const newProject = new Project(newProjectName);
      portfolio.addProject(newProject);
      currentProject = newProject;
      updateProjectSelect();
    } else {
      currentProject = portfolio
        .getDetails()
        .find((project) => project.details.name === projectSelect.value);
    }
  }

  const newToDo = new ToDo(taskTitle, taskDescription, taskDate, taskPriority);
  currentProject.addTodo(newToDo);
  updateUI();

  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#dueDate").value = "";
  document.querySelector("#priority").value = "Normal";
});

// Function to update UI
function updateUI() {
  projectsContainer.innerHTML = ""; // Clear previous content

  // Loop through all the projects in the portfolio
  portfolio.getDetails().forEach((project) => {
    // Create a section for each project
    const projectSection = document.createElement("div");
    projectSection.classList.add("project-section");

    // Project header
    const projectHeader = document.createElement("h3");
    projectHeader.textContent = project.details.name;
    projectSection.appendChild(projectHeader);

    // Loop through the to-dos in the current project
    project.details.list.forEach((todo, index) => {
      const todoCard = document.createElement("div");
      todoCard.classList.add("todo-card");

      if (!todo.active) {
        todoCard.classList.add("completed");
      }

      todoCard.innerHTML = `
        <h4>${todo.title}</h4>
        <p>${todo.description}</p>
        <p>Due Date: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority}</p>
        <p>Status: ${todo.getTaskStatus(todo)} </p>
        <button onclick="completeTask(${index}, '${
        project.details.name
      }')">Complete</button>
        <button onclick="removeTask(${index}, '${
        project.details.name
      }')">Remove</button>
      `;

      // Append the todo card to the project section
      projectSection.appendChild(todoCard);
    });

    // Append the project section to the main container
    projectsContainer.appendChild(projectSection);
  });
}

function updateProjectSelect() {
  projectSelect.innerHTML = "";

  const addNewOption = document.createElement("option");
  addNewOption.value = "new";
  addNewOption.textContent = "Add new project";
  projectSelect.appendChild(addNewOption);

  portfolio.getDetails().forEach((project) => {
    const projectOption = document.createElement("option");
    projectOption.value = project.details.name;
    projectOption.textContent = project.details.name;
    projectSelect.appendChild(projectOption);
  });
}

window.completeTask = function (index, projectName) {
  const project = portfolio
    .getDetails()
    .find((p) => p.details.name === projectName);
  project.details.list[index].active = false;
  updateUI();
};

window.removeTask = function (index, projectName) {
  const project = portfolio
    .getDetails()
    .find((p) => p.details.name === projectName);
  project.details.list.splice(index, 1);
  updateUI();
};

// Add focus event listeners to clear error when user focuses on input
document.querySelector("#title").addEventListener("focus", () => {
  document.querySelector("#title").classList.remove("error");
});
