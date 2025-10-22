function buildPageStructure() {
    var body = document.querySelector("body");
    var root = document.createElement("div");
    root.classList.add("root");
    body === null || body === void 0 ? void 0 : body.appendChild(root);
    // todo section
    var todoSection = document.createElement("section");
    todoSection.classList.add("todo-section");
    root === null || root === void 0 ? void 0 : root.appendChild(todoSection);
    // Title
    var title = document.createElement("h2");
    title.textContent = "My Tasks";
    todoSection.appendChild(title);
    // Active tasks section
    var activeTitle = document.createElement("h3");
    activeTitle.textContent = "Active Tasks";
    todoSection.appendChild(activeTitle);
    var activeTasksList = createTaskList();
    activeTasksList.classList.add("active-tasks");
    todoSection.appendChild(activeTasksList);
    // input task section
    var inputDiv = document.createElement("div");
    inputDiv.classList.add("input-task");
    inputDiv.innerHTML = "<input id=\"task-input\" class=\"input-task-field\" type=\"text\" placeholder=\"enter a new task\" />";
    todoSection.appendChild(inputDiv);
    // comleted  tasks section
    var comletedTitle = document.createElement("h3");
    comletedTitle.textContent = "Completed Tasks";
    todoSection.appendChild(comletedTitle);
    var completedTasklist = createTaskList();
    completedTasklist.classList.add("completed-tasks");
    todoSection.appendChild(completedTasklist);
}
function createTaskList() {
    var ul = document.createElement("ul");
    ul.style.listStyleType = "none";
    return ul;
}
buildPageStructure();
