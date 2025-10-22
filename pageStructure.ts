
function buildPageStructure(): void {
    const body = document.querySelector("body")
    const root = document.createElement("div")
    root.classList.add("root")

    body?.appendChild(root)
  // todo section
  const todoSection = document.createElement("section");
  todoSection.classList.add("todo-section");
  root?.appendChild(todoSection);

  // Title
  const title = document.createElement("h2");
  title.textContent = "My Tasks";
  todoSection.appendChild(title);

  // Active tasks section
  const activeTitle = document.createElement("h3");
  activeTitle.textContent = "Active Tasks";
  todoSection.appendChild(activeTitle);
  const activeTasksList = createTaskList();
  activeTasksList.classList.add("active-tasks");
  todoSection.appendChild(activeTasksList);

  // input task section
  const inputDiv = document.createElement("div");
  inputDiv.classList.add("input-task");
  inputDiv.innerHTML = `<input id="task-input" class="input-task-field" type="text" placeholder="enter a new task" />`;
  todoSection.appendChild(inputDiv);

  // comleted  tasks section
  const comletedTitle = document.createElement("h3");
  comletedTitle.textContent = "Completed Tasks";
  todoSection.appendChild(comletedTitle);
  const completedTasklist = createTaskList();
  completedTasklist.classList.add("completed-tasks");
  todoSection.appendChild(completedTasklist);
}


function createTaskList(): HTMLUListElement {
  const ul = document.createElement("ul") as HTMLUListElement;
  ul.style.listStyleType = "none";
  return ul;
}

buildPageStructure()