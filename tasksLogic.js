function loadTasksFromStorage(activeTasksList, completedTasklist) {
    var activeTasks = JSON.parse(localStorage.getItem("activeTasks") || "[]");
    var completedTasks = JSON.parse(localStorage.getItem("completedTasks") || "[]");
    activeTasks.forEach(function (task) {
        createTaskElement(activeTasksList, completedTasklist, task, false);
    });
    completedTasks.forEach(function (task) {
        createTaskElement(activeTasksList, completedTasklist, task, true);
    });
}
// Adds an Enter key listener to the input
// On Enter, adds a new li to the provided ul and clears the input
function handleInputEnter(input, activeTasksList, completedTasklist) {
    input.addEventListener("keydown", function (e) {
        console.log(e.key);
        if (e.key === "Enter" && input.value.trim() !== "") {
            var dataFromStorage = JSON.parse(localStorage.getItem("activeTasks") || "[]");
            dataFromStorage.push(input.value.trim());
            var newdata = JSON.stringify(dataFromStorage);
            localStorage.setItem("activeTasks", newdata);
            createTaskElement(activeTasksList, completedTasklist, input.value.trim());
            input.value = "";
        }
    });
}
function createTaskElement(activeTasksList, completedTasklist, textValue, completed) {
    if (completed === void 0) { completed = false; }
    var li = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var text = document.createElement("span");
    text.textContent = textValue;
    li.appendChild(checkbox);
    li.appendChild(text);
    if (!completed) {
        activeTasksList.appendChild(li);
    }
    else {
        completedTasklist.appendChild(li);
        li.classList.add("completed");
        checkbox.checked = completed;
    }
    editTask(li);
    checkbox.addEventListener("change", function () {
        updateTaskStatus(activeTasksList, completedTasklist, checkbox.checked, li);
        updateStorage(activeTasksList, completedTasklist);
    });
}
function updateTaskStatus(activeTasksList, completedTasklist, completed, li) {
    if (completed) {
        li.classList.add("completed");
        activeTasksList.removeChild(li);
        completedTasklist.appendChild(li);
    }
    else {
        li.classList.remove("completed");
        completedTasklist.removeChild(li);
        activeTasksList.appendChild(li);
    }
}
function updateStorage(activeTasksList, completedTasklist) {
    var activeTasks = [];
    var completedTasks = [];
    activeTasksList.querySelectorAll("span").forEach(function (span) {
        if (span.textContent)
            activeTasks.push(span.textContent);
    });
    completedTasklist.querySelectorAll("span").forEach(function (span) {
        if (span.textContent)
            completedTasks.push(span.textContent);
    });
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}
function editTask(li) {
    li.addEventListener("dblclick", function () {
        var text = li.querySelector("span");
        if (!text)
            return;
        var originalText = text.textContent;
        text.contentEditable = "true";
        text.focus();
        var keyHandler = function (e) {
            if (e.key === "Enter") {
                text.contentEditable = "false";
                text.removeEventListener("keydown", keyHandler);
                updateStorage(document.querySelector(".active-tasks"), document.querySelector(".completed-tasks"));
            }
            else if (e.key === "Escape") {
                text.textContent = originalText;
                text.contentEditable = "false";
                text.removeEventListener("keydown", keyHandler);
            }
        };
        text.addEventListener("keydown", keyHandler);
    });
}
function initTaskLogic() {
    var input = document.querySelector(".input-task-field");
    var activeTasksList = document.querySelector(".active-tasks");
    var completedTasklist = document.querySelector(".completed-tasks");
    if (!input || !activeTasksList || !completedTasklist)
        return;
    loadTasksFromStorage(activeTasksList, completedTasklist);
    handleInputEnter(input, activeTasksList, completedTasklist);
}
initTaskLogic();
