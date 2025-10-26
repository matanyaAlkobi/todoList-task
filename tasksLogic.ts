// Loads saved tasks from localStorage and creates their elements in the UI
function loadTasksFromStorage(
  activeTasksList: HTMLUListElement,
  completedTasklist: HTMLUListElement
): void {
  const activeTasks = JSON.parse(localStorage.getItem("activeTasks") || "[]");
  const completedTasks = JSON.parse(
    localStorage.getItem("completedTasks") || "[]"
  );

  activeTasks.forEach((task: string) => {
    createTaskElement(activeTasksList, completedTasklist, task, false);
  });

  completedTasks.forEach((task: string) => {
    createTaskElement(activeTasksList, completedTasklist, task, true);
  });
}

// Adds an event listener to the input field
// Creates a new task when the user presses Enter
function handleInputEnter(
  input: HTMLInputElement,
  activeTasksList: HTMLUListElement,
  completedTasklist: HTMLUListElement
): void {
  input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
      const dataFromStorage = JSON.parse(
        localStorage.getItem("activeTasks") || "[]"
      );
      dataFromStorage.push(input.value.trim());
      localStorage.setItem("activeTasks", JSON.stringify(dataFromStorage));

      createTaskElement(activeTasksList, completedTasklist, input.value.trim());
      input.value = "";
    }
  });
}

// Creates a new task <li> element with checkbox, text, edit, and remove buttons
function createTaskElement(
  activeTasksList: HTMLUListElement,
  completedTasklist: HTMLUListElement,
  textValue: string,
  completed = false
) {
  const li = document.createElement("li") as HTMLLIElement;
  const checkbox = document.createElement("input") as HTMLInputElement;
  checkbox.type = "checkbox";

  const text = document.createElement("span") as HTMLSpanElement;
  text.textContent = textValue;

  li.appendChild(checkbox);
  li.appendChild(text);
  const div = document.createElement("div");
  div.classList.add("task-buttond");
  editButtun(li, div);
  removeTask(li, activeTasksList, completedTasklist, div);
  li.appendChild(div);
  if (!completed) {
    activeTasksList.appendChild(li);
  } else {
    completedTasklist.appendChild(li);
    li.classList.add("completed");
    checkbox.checked = completed;
  }

  editTask(li);
  checkbox.addEventListener("change", () => {
    updateTaskStatus(activeTasksList, completedTasklist, checkbox.checked, li);
    updateStorage(activeTasksList, completedTasklist);
  });
}

// Moves a task between active and completed lists based on its checkbox state
function updateTaskStatus(
  activeTasksList: HTMLUListElement,
  completedTasklist: HTMLUListElement,
  completed: boolean,
  li: HTMLLIElement
) {
  if (completed) {
    li.classList.add("completed");
    activeTasksList.removeChild(li);
    completedTasklist.appendChild(li);
  } else {
    li.classList.remove("completed");
    completedTasklist.removeChild(li);
    activeTasksList.appendChild(li);
  }
}

// Updates localStorage with the current active and completed tasks
function updateStorage(
  activeTasksList: HTMLUListElement,
  completedTasklist: HTMLUListElement
): void {
  const activeTasks: string[] = [];
  const completedTasks: string[] = [];

  activeTasksList.querySelectorAll("span").forEach((span) => {
    if (span.textContent) activeTasks.push(span.textContent);
  });
  completedTasklist.querySelectorAll("span").forEach((span) => {
    if (span.textContent) completedTasks.push(span.textContent);
  });

  localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

// Enables editing a task’s text on double-click
function editTask(li: HTMLLIElement): void {
  li.addEventListener("dblclick", () => {
    const text = li.querySelector("span");
    if (!text) return;
    enableEditing(text);
  });
}

// Makes the task text editable and handles Enter (save) / Escape (cancel) keys
function enableEditing(text: HTMLSpanElement) {
  const originalText = text.textContent;

  text.contentEditable = "true";
  text.focus();

  const keyHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      text.contentEditable = "false";
      text.removeEventListener("keydown", keyHandler);
      updateStorage(
        document.querySelector(".active-tasks")!,
        document.querySelector(".completed-tasks")!
      );
    } else if (e.key === "Escape") {
      text.textContent = originalText;
      text.contentEditable = "false";
      text.removeEventListener("keydown", keyHandler);
    }
  };

  text.addEventListener("keydown", keyHandler);
}

// Adds an edit button to a task and connects it to the edit logic
function editButtun(li: HTMLLIElement, div: HTMLDivElement) {
  const editBtn = document.createElement("button");
  editBtn.textContent = "edit";
  editBtn.classList.add("edit-btn");
  div.appendChild(editBtn);
  const text = li.querySelector("span");
  editBtn.addEventListener("click", () => {
    if (!text) return;
    enableEditing(text);
  });
}

// Removes a specific localStorage key and clears the related task list on the page
function removeItemAndUpdatePage(element: HTMLElement, keyName: string) {
  if (localStorage.getItem(keyName)) {
    localStorage.removeItem(keyName);
  }
  element.innerHTML = "";
}

// Adds a remove button to a task and updates storage after deletion
function removeTask(
  li: HTMLLIElement,
  activeTasksList: HTMLUListElement,
  completedTasklist: HTMLUListElement,
  div: HTMLDivElement
) {
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  div.appendChild(removeButton);
  removeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const liToRemove = (event.target as HTMLElement).closest("li")
    liToRemove?.remove()
    updateStorage(activeTasksList, completedTasklist);
  });
}

// Adds a “Clear All” button that removes all active and completed tasks
function setupClearAllTasksButton(
  activeTasksList: HTMLUListElement,
  completedTasklist: HTMLUListElement
) {
  const clearAllButton = document.querySelector(".clear-all-btn");
  clearAllButton?.addEventListener("click", () => {
    removeItemAndUpdatePage(activeTasksList, "activeTasks");
    removeItemAndUpdatePage(completedTasklist, "completedTasks");
  });
}

// Adds a button that deletes only completed tasks
function setupDeleteCompletedTasksButton(completedTasklist: HTMLUListElement) {
  const deleteCompletedTasksButton = document.querySelector(
    ".delete-completed-tasks-btn"
  );
  deleteCompletedTasksButton?.addEventListener("click", () => {
    removeItemAndUpdatePage(completedTasklist, "completedTasks");
  });
}

// Enables drag-and-drop sorting and movement between lists, updating storage accordingly
function setupDragAndDrop(
  activeTasksList: HTMLUListElement,
  completedTasklist: HTMLUListElement
) {
  new Sortable(activeTasksList, {
    group: "tasks",
    animation: 150,
    onEnd: (e) => {
      const draggingItem = e.item as HTMLLIElement;
      const checkbox = draggingItem.querySelector<HTMLInputElement>(
        "input[type='checkbox']"
      );

      if (draggingItem.parentElement === completedTasklist) {
        checkbox!.checked = true;
        draggingItem.classList.add("completed");
      } 
      updateStorage(activeTasksList, completedTasklist);
    },
  });

  new Sortable(completedTasklist, {
    group: "tasks",
    animation: 150,
    onEnd: (e) => {
      const draggingItem = e.item as HTMLLIElement;
      const checkbox = draggingItem.querySelector<HTMLInputElement>(
        "input[type='checkbox']"
      );
      setTimeout(() => {
        if (draggingItem.parentElement === activeTasksList) {
          checkbox!.checked = false;
          draggingItem.classList.remove("completed");
        }
        updateStorage(activeTasksList, completedTasklist);
      }, 0);
    },
  });
}

// Initializes the entire task logic: input handling, loading from storage, buttons, and drag-and-drop
function initTaskLogic() {
  const input = document.querySelector<HTMLInputElement>(".input-task-field");
  const activeTasksList =
    document.querySelector<HTMLUListElement>(".active-tasks");
  const completedTasklist =
    document.querySelector<HTMLUListElement>(".completed-tasks");

  if (!input || !activeTasksList || !completedTasklist) return;
  loadTasksFromStorage(activeTasksList, completedTasklist);
  handleInputEnter(input, activeTasksList, completedTasklist);
  setupClearAllTasksButton(activeTasksList, completedTasklist);
  setupDeleteCompletedTasksButton(completedTasklist);
  setupDragAndDrop(activeTasksList, completedTasklist);
}

initTaskLogic();
