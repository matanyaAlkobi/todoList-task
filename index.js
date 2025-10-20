var root = document.querySelector("#root");
// Creates and returns a new HTML element of the given type
function createElement(element) {
    return document.createElement(element);
}
// Creates a div containing a text input for adding tasks
// Returns an object: { div, input }
function createTaskInput() {
    var div = createElement("div");
    var input = createElement("input");
    div.classList.add("input-task");
    input.classList.add("input-task-field");
    input.placeholder = "enter a new task";
    input.type = "text";
    div.appendChild(input);
    return { div: div, input: input };
}
function createTaskList() {
    var ul = createElement("ul");
    ul.style.listStyleType = "none";
    return ul;
}
// Adds an Enter key listener to the input
// On Enter, adds a new li to the provided ul and clears the input
function handleInputEnter(input, activeTasks) {
    input.addEventListener("keydown", function (e) {
        console.log(e.key);
        if (e.key === "Enter" && input.value.trim() !== "") {
            var li_1 = createElement("li");
            var label = createElement("label");
            var checkbox_1 = createElement("input");
            checkbox_1.type = "checkbox";
            label.appendChild(checkbox_1);
            label.appendChild(document.createTextNode(input.value));
            li_1.appendChild(label);
            activeTasks.appendChild(li_1);
            checkbox_1.addEventListener("change", function () {
                if (checkbox_1.checked) {
                    activeTasks.removeChild(li_1);
                }
            });
            input.value = "";
        }
    });
}
// todo section
var todoSection = createElement("section");
todoSection.classList.add("todo-section");
root === null || root === void 0 ? void 0 : root.appendChild(todoSection);
// Title
var title = createElement("h2");
title.textContent = "My Tasks";
todoSection.appendChild(title);
// Active tasks section
var activeTitle = createElement("h3");
activeTitle.textContent = "Active Tasks";
todoSection.appendChild(activeTitle);
// input task section
var _a = createTaskInput(), div = _a.div, input = _a.input;
var activeTasks = createTaskList();
todoSection.appendChild(activeTasks);
handleInputEnter(input, activeTasks);
todoSection.appendChild(div);
// Completed tasks section
var completedTitle = createElement("h3");
completedTitle.textContent = "Completed Tasks";
todoSection.appendChild(completedTitle);
