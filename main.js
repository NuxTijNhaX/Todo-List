class Task {
    constructor(id = 0, title = "None", description = "None", isCompleted = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdTime = new Date();
        this.isCompleted = isCompleted;
    }
}

class Board {
    constructor() {
        this.tasks = []
    }

    add(newTask) {
        if(!this.tasks.some(tasks => tasks.title === newTask.title)) {
            this.tasks.push(newTask);
        }
        else {
            alert("Existed Task!")
        }
    }

    remove(title) {
        this.tasks = this.tasks.filter(tasks => tasks.title !== title)
    }

    get(title) {
        return this.tasks.find(tasks => tasks.title === title)
    }
}

const board = new Board();

const addTaskForm = document.getElementById("addTaskForm");
const addTaskBtn = document.getElementById("addTaskBtn");
const overlay = document.getElementById("overlay");
const taskGrid = document.getElementById("taskGrid");
const submitTask = document.getElementById("submitTask");

const createTaskCard = (newTask) => {
    const card = document.createElement("div");
    const title = document.createElement("p");
    const date = document.createElement("p");
    const description = document.createElement("p");
    const btnGroup = document.createElement("div");
    const completedStatus = document.createElement("button");
    const removeBtn = document.createElement("button");

    card.classList.add("task-card");
    btnGroup.classList.add("btn-group");
    completedStatus.classList.add("btn");
    removeBtn.classList.add("btn");

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(date);
    btnGroup.appendChild(completedStatus);
    btnGroup.appendChild(removeBtn);
    card.appendChild(btnGroup);
    taskGrid.appendChild(card);

    title.textContent = `"${newTask.title}"`;
    description.textContent = `${newTask.description}`;
    date.textContent = `${newTask.createdTime.toLocaleDateString('en-US')}`;
    removeBtn.textContent = "Remove";

    if(newTask.isCompleted) {
        completedStatus.textContent = "Completed";
        completedStatus.classList.add("btn-light-green");
    } else {
        completedStatus.textContent = "Not Completed";
        completedStatus.classList.add("btn-light-red");
    }

    removeBtn.onclick = removeTask;
    completedStatus.onclick = changeStatus;
}

const openAddingTaskForm = () => {
    addTaskForm.classList.add("active");
    overlay.classList.add("active");
}

const closeAddingTaskForm = () => {
    addTaskForm.classList.remove("active");
    overlay.classList.remove("active");
}

const createTaskFromForm = () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const isCompleted = document.getElementById("isCompleted").checked;

    return new Task(title, description, isCompleted);
}

const addTask = (e) => {
    e.preventDefault();
    
    board.add(createTaskFromForm());
    updateTasksGrid();
    closeAddingTaskForm();
}

const removeTask = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', '');

    board.remove(title);
    updateTasksGrid();
}

const resetTasksGrid = () => {
    taskGrid.innerHTML = '';
}

const updateTasksGrid = () => {
    resetTasksGrid();
    for (let task of board.tasks) {
      createTaskCard(task);
    }
}

const changeStatus = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', '');

    const currentTask = board.get(title);
    currentTask.isCompleted = !currentTask.isCompleted;
    updateTasksGrid();
}

addTaskBtn.onclick = openAddingTaskForm;
overlay.onclick = closeAddingTaskForm;
submitTask.onclick = addTask;
