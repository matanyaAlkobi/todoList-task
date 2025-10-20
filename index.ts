const root = document.querySelector<HTMLDivElement>("#root");

// Creates and returns a new HTML element of the given type
function createElement(element: string): HTMLElement {
  return document.createElement(element);
}

// Creates a div containing a text input for adding tasks
// Returns an object: { div, input }
function createTaskInput(): { div: HTMLDivElement; input: HTMLInputElement } {
  const div = createElement("div") as HTMLDivElement;
  const input = createElement("input") as HTMLInputElement;
  div.classList.add("input-task");
  input.classList.add("input-task-field");
  input.placeholder = "enter a new task";
  input.type = "text";
  div.appendChild(input);
  return { div, input };
}

function createTaskList(): HTMLUListElement {
  const ul = createElement("ul") as HTMLUListElement;
  ul.style.listStyleType = "none";
  return ul;
}

// Adds an Enter key listener to the input
// On Enter, adds a new li to the provided ul and clears the input
function handleInputEnter(
  input: HTMLInputElement,
  activeTasks: HTMLUListElement
): void {
  input.addEventListener("keydown", (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "Enter" && input.value.trim() !== "") {
      const li = createElement("li") as HTMLLIElement;

      const label = createElement("label") as HTMLLabelElement;
      const checkbox = createElement("input") as HTMLInputElement;
      checkbox.type = "checkbox";

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(input.value));
      li.appendChild(label);

      activeTasks.appendChild(li);

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          activeTasks.removeChild(li);
        }
      });

      input.value = "";
    }
  });
}

// todo section
const todoSection = createElement("section");
todoSection.classList.add("todo-section");
root?.appendChild(todoSection);

// Title
const title = createElement("h2");
title.textContent = "My Tasks";
todoSection.appendChild(title);

// Active tasks section
const activeTitle = createElement("h3");
activeTitle.textContent = "Active Tasks";
todoSection.appendChild(activeTitle);

// input task section
const { div, input } = createTaskInput();
const activeTasks = createTaskList();
todoSection.appendChild(activeTasks);

handleInputEnter(input, activeTasks);
todoSection.appendChild(div);
