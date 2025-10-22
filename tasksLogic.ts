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

// Adds an Enter key listener to the input
// On Enter, adds a new li to the provided ul and clears the input
function handleInputEnter(
  input: HTMLInputElement,
  activeTasksList: HTMLUListElement,
  completedTasklist: HTMLUListElement
): void {
  input.addEventListener("keydown", (e: KeyboardEvent) => {
    console.log(e.key);
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
  removeTask(li, activeTasksList, completedTasklist);
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

function editTask(li: HTMLLIElement): void {
  li.addEventListener("dblclick", () => {
    const text = li.querySelector("span");
    if (!text) return;
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
  });
}

function removeItemAndUpdatePage(element: HTMLElement, keyName: string) {
  if (localStorage.getItem(keyName)) {
    localStorage.removeItem(keyName);
  }
  element.innerHTML = "";
}

function removeTask(
  li: HTMLLIElement,
  activeTasksList: HTMLUListElement,
  completedTasklist: HTMLUListElement
) {
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  li.appendChild(removeButton);
  removeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const clickedButton = event.target as HTMLElement;
    clickedButton.parentElement?.remove();
    updateStorage(activeTasksList, completedTasklist);
  });
}

function clearAllButton(
  activeTasksList: HTMLUListElement,
  completedTasklist: HTMLUListElement
) {
  const clearAllButton = document.querySelector(".clear-all-btn");
  clearAllButton?.addEventListener("click", () => {
    removeItemAndUpdatePage(activeTasksList, "activeTasks");
    removeItemAndUpdatePage(completedTasklist, "completedTasks");
  });
}

function initTaskLogic() {
  const input = document.querySelector<HTMLInputElement>(".input-task-field");
  const activeTasksList =
    document.querySelector<HTMLUListElement>(".active-tasks");
  const completedTasklist =
    document.querySelector<HTMLUListElement>(".completed-tasks");

  if (!input || !activeTasksList || !completedTasklist) return;
  loadTasksFromStorage(activeTasksList, completedTasklist);
  handleInputEnter(input, activeTasksList, completedTasklist);
  clearAllButton(activeTasksList, completedTasklist);
}

initTaskLogic();
