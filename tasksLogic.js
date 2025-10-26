// Loads saved tasks from localStorage and creates their elements in the UI
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
// Adds an event listener to the input field
// Creates a new task when the user presses Enter
function handleInputEnter(input, activeTasksList, completedTasklist) {
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && input.value.trim() !== "") {
            var dataFromStorage = JSON.parse(localStorage.getItem("activeTasks") || "[]");
            dataFromStorage.push(input.value.trim());
            localStorage.setItem("activeTasks", JSON.stringify(dataFromStorage));
            createTaskElement(activeTasksList, completedTasklist, input.value.trim());
            input.value = "";
        }
    });
}
// Creates a new task <li> element with checkbox, text, edit, and remove buttons
function createTaskElement(activeTasksList, completedTasklist, textValue, completed) {
    if (completed === void 0) { completed = false; }
    var li = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var text = document.createElement("span");
    text.textContent = textValue;
    li.appendChild(checkbox);
    li.appendChild(text);
    var div = document.createElement("div");
    div.classList.add("task-buttond");
    editButtun(li, div);
    removeTask(li, activeTasksList, completedTasklist, div);
    li.appendChild(div);
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
// Moves a task between active and completed lists based on its checkbox state
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
// Updates localStorage with the current active and completed tasks
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
// Enables editing a task’s text on double-click
function editTask(li) {
    li.addEventListener("dblclick", function () {
        var text = li.querySelector("span");
        if (!text)
            return;
        enableEditing(text);
    });
}
// Makes the task text editable and handles Enter (save) / Escape (cancel) keys
function enableEditing(text) {
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
}
// Adds an edit button to a task and connects it to the edit logic
function editButtun(li, div) {
    var editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.classList.add("edit-btn");
    div.appendChild(editBtn);
    var text = li.querySelector("span");
    editBtn.addEventListener("click", function () {
        if (!text)
            return;
        enableEditing(text);
    });
}
// Removes a specific localStorage key and clears the related task list on the page
function removeItemAndUpdatePage(element, keyName) {
    if (localStorage.getItem(keyName)) {
        localStorage.removeItem(keyName);
    }
    element.innerHTML = "";
}
// Adds a remove button to a task and updates storage after deletion
function removeTask(li, activeTasksList, completedTasklist, div) {
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    div.appendChild(removeButton);
    removeButton.addEventListener("click", function (event) {
        event.stopPropagation();
        var liToRemove = event.target.closest("li");
        liToRemove === null || liToRemove === void 0 ? void 0 : liToRemove.remove();
        updateStorage(activeTasksList, completedTasklist);
    });
}
// Adds a “Clear All” button that removes all active and completed tasks
function setupClearAllTasksButton(activeTasksList, completedTasklist) {
    var clearAllButton = document.querySelector(".clear-all-btn");
    clearAllButton === null || clearAllButton === void 0 ? void 0 : clearAllButton.addEventListener("click", function () {
        removeItemAndUpdatePage(activeTasksList, "activeTasks");
        removeItemAndUpdatePage(completedTasklist, "completedTasks");
    });
}
// Adds a button that deletes only completed tasks
function setupDeleteCompletedTasksButton(completedTasklist) {
    var deleteCompletedTasksButton = document.querySelector(".delete-completed-tasks-btn");
    deleteCompletedTasksButton === null || deleteCompletedTasksButton === void 0 ? void 0 : deleteCompletedTasksButton.addEventListener("click", function () {
        removeItemAndUpdatePage(completedTasklist, "completedTasks");
    });
}
// Enables drag-and-drop sorting and movement between lists, updating storage accordingly
function setupDragAndDrop(activeTasksList, completedTasklist) {
    new Sortable(activeTasksList, {
        group: "tasks",
        animation: 150,
        onEnd: function (e) {
            var draggingItem = e.item;
            var checkbox = draggingItem.querySelector("input[type='checkbox']");
            if (draggingItem.parentElement === completedTasklist) {
                checkbox.checked = true;
                draggingItem.classList.add("completed");
            }
            updateStorage(activeTasksList, completedTasklist);
        },
    });
    new Sortable(completedTasklist, {
        group: "tasks",
        animation: 150,
        onEnd: function (e) {
            var draggingItem = e.item;
            var checkbox = draggingItem.querySelector("input[type='checkbox']");
            setTimeout(function () {
                if (draggingItem.parentElement === activeTasksList) {
                    checkbox.checked = false;
                    draggingItem.classList.remove("completed");
                }
                updateStorage(activeTasksList, completedTasklist);
            }, 0);
        },
    });
}
// Initializes the entire task logic: input handling, loading from storage, buttons, and drag-and-drop
function initTaskLogic() {
    var input = document.querySelector(".input-task-field");
    var activeTasksList = document.querySelector(".active-tasks");
    var completedTasklist = document.querySelector(".completed-tasks");
    if (!input || !activeTasksList || !completedTasklist)
        return;
    loadTasksFromStorage(activeTasksList, completedTasklist);
    handleInputEnter(input, activeTasksList, completedTasklist);
    setupClearAllTasksButton(activeTasksList, completedTasklist);
    setupDeleteCompletedTasksButton(completedTasklist);
    setupDragAndDrop(activeTasksList, completedTasklist);
}
initTaskLogic();
