const add: HTMLElement | null = document.querySelector(".btn");
const input: HTMLInputElement | null = document.querySelector(".input");
const tasks: HTMLElement | null = document.querySelector(".tasks");
const clear: HTMLElement | null = document.querySelector(".clear-btn");

const createTask = (taskContent: string) => {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task", "not-crossed-out");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checked");

  const blockDiv = document.createElement("div");
  blockDiv.classList.add("block");

  const lineDiv = document.createElement("div");
  lineDiv.classList.add("line");

  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item");
  itemDiv.style.maxWidth = "530px";
  itemDiv.textContent = taskContent;

  const editInput = document.createElement("input");
  editInput.style.display = "none";
  editInput.style.maxWidth = "530px";
  editInput.style.width = "100%";
  editInput.type = "text";
  editInput.style.fontSize = "16px"
  editInput.value = taskContent;

  blockDiv.appendChild(lineDiv);
  blockDiv.appendChild(itemDiv);
  blockDiv.appendChild(editInput);

  const signsDiv = document.createElement("div");
  signsDiv.classList.add("signs");

  const pencilImg = document.createElement("img");
  pencilImg.src = "./assets/pencil.png";
  pencilImg.alt = "pencil";
  pencilImg.classList.add("pencil");

  const rubishImg = document.createElement("img");
  rubishImg.src = "./assets/rubish.png";
  rubishImg.alt = "rubish";
  rubishImg.classList.add("rubish");

  const approveImg = document.createElement("img");
  approveImg.src = "./assets/approve.png";
  approveImg.alt = "approve";
  approveImg.classList.add("approve");

  signsDiv.appendChild(pencilImg);
  signsDiv.appendChild(rubishImg);
  signsDiv.appendChild(approveImg);

  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(blockDiv);
  taskDiv.appendChild(signsDiv);

  tasks?.appendChild(taskDiv);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      taskDiv.classList.add("cross-out");
      taskDiv.classList.remove("not-crossed-out");
    } else {
      taskDiv.classList.remove("cross-out");
      taskDiv.classList.add("not-crossed-out");
    }
    saveTasks();
  });

  rubishImg.addEventListener("click", () => {
    if (taskDiv.parentNode) {
      taskDiv.parentNode.removeChild(taskDiv);
      saveTasks();
    }
  });

  pencilImg.addEventListener("click", () => {
    itemDiv.style.display = "none";
    editInput.style.display = "block";
    taskDiv.classList.add("editing");
    editInput.focus();
  });

  approveImg.addEventListener("click", () => {
    const newContent = editInput.value.trim();
    if (newContent) {
      itemDiv.textContent = newContent;
      itemDiv.style.display = "block";
      editInput.style.display = "none";
      taskDiv.classList.remove("editing");
      saveTasks();
    } else {
      alert("Task content cannot be empty.");
    }
  });
};

const toggleCrossedOut = (taskDiv: HTMLElement) => {
  taskDiv.classList.toggle("cross-out");
  taskDiv.classList.toggle("not-crossed-out");
  saveTasks();
};
const saveTasks = () => {
  const taskElements = tasks?.querySelectorAll(".task");
  if (taskElements) {
    const tasksArray = Array.from(taskElements).map((task) => {
      return {
        text: (task.querySelector(".item") as HTMLDivElement).textContent || "",
        checked: (task.querySelector(".checked") as HTMLInputElement).checked,
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
};

const loadTasks = () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasksArray = JSON.parse(savedTasks);
    tasksArray.forEach((task: { text: string; checked: boolean }) => {
      createTask(task.text);
      const taskDiv = tasks?.lastElementChild as HTMLDivElement;
      if (taskDiv) {
        (taskDiv.querySelector(".checked") as HTMLInputElement).checked =
          task.checked;
        if (task.checked) {
          taskDiv.classList.add("cross-out");
          taskDiv.classList.remove("not-crossed-out");
        } else {
          taskDiv.classList.add("not-crossed-out");
          taskDiv.classList.remove("cross-out");
        }
      }
    });
  }
};

const addTask = () => {
  const taskContent = input?.value.trim();

  if (taskContent && input) {
    createTask(taskContent);
    saveTasks();
    input.value = "";
  } else {
    alert("Please enter a task.");
  }
};

add?.addEventListener("click", addTask);

input?.addEventListener("keypress", (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    addTask();
  }
});

clear?.addEventListener("click", () => {
  if (tasks) {
    tasks.innerHTML = "";
  }
  localStorage.removeItem("tasks");
});

window.addEventListener("load", loadTasks);
