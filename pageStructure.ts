function buildPageStructure(): void {
  const body = document.querySelector("body");
  const root = document.createElement("div");
  root.classList.add("root");

  body?.appendChild(root);

  // todo section
  const todoSection = document.createElement("section");
  todoSection.classList.add("todo-section");
  root?.appendChild(todoSection);

  // Title
  const title = document.createElement("h2");
  title.textContent = "My Tasks";
  todoSection.appendChild(title);

  // Button to clear all tasks
  const clearAllButton = document.createElement("button");
  clearAllButton.textContent = "Clear All";
  clearAllButton.classList.add("clear-all-btn");
  todoSection.appendChild(clearAllButton);

  // Active tasks section
  const activeTitle = document.createElement("h3");
  activeTitle.textContent = "Active Tasks";
  todoSection.appendChild(activeTitle);
  const activeTasksList = createTaskList();
  activeTasksList.classList.add("active-tasks");
  todoSection.appendChild(activeTasksList);

  // input task section
  const inputDiv = document.createElement("div");
  const inputField = document.createElement("input");
  inputField.id = "task-input";
  inputField.classList.add("input-task-field");
  inputField.type = "text";
  inputField.placeholder = "enter a new task";
  inputDiv.appendChild(inputField);
  todoSection.appendChild(inputDiv);

  // completed  tasks section

  //completed  tasks title
  const completedTitle = document.createElement("h3");
  completedTitle.textContent = "Completed Tasks";
  todoSection.appendChild(completedTitle);

  //clear completed tasks buttun
  const deleteCompletedTasksButton = document.createElement("button");
  deleteCompletedTasksButton.textContent = "Delete Completed Tasks";
  deleteCompletedTasksButton.classList.add("delete-completed-tasks-btn");
  todoSection.appendChild(deleteCompletedTasksButton);
  // list of comleted  tasks
  const completedTasklist = createTaskList();
  completedTasklist.classList.add("completed-tasks");
  todoSection.appendChild(completedTasklist);
}

function createTaskList(): HTMLUListElement {
  const ul = document.createElement("ul") as HTMLUListElement;
  ul.style.listStyleType = "none";
  return ul;
}

buildPageStructure();
