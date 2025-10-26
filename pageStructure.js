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
    // Button to clear all tasks
    var clearAllButton = document.createElement("button");
    clearAllButton.textContent = "Clear All";
    clearAllButton.classList.add("clear-all-btn");
    todoSection.appendChild(clearAllButton);
    // Active tasks section
    var activeTitle = document.createElement("h3");
    activeTitle.textContent = "Active Tasks";
    todoSection.appendChild(activeTitle);
    var activeTasksList = createTaskList();
    activeTasksList.classList.add("active-tasks");
    todoSection.appendChild(activeTasksList);
    // input task section
    var inputDiv = document.createElement("div");
    var inputField = document.createElement("input");
    inputField.id = "task-input";
    inputField.classList.add("input-task-field");
    inputField.type = "text";
    inputField.placeholder = "enter a new task";
    inputDiv.appendChild(inputField);
    todoSection.appendChild(inputDiv);
    // completed  tasks section
    //completed  tasks title
    var completedTitle = document.createElement("h3");
    completedTitle.textContent = "Completed Tasks";
    todoSection.appendChild(completedTitle);
    //clear completed tasks buttun
    var deleteCompletedTasksButton = document.createElement("button");
    deleteCompletedTasksButton.textContent = "Delete Completed Tasks";
    deleteCompletedTasksButton.classList.add("delete-completed-tasks-btn");
    todoSection.appendChild(deleteCompletedTasksButton);
    // list of comleted  tasks
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
