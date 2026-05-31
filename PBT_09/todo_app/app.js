const STORAGE_KEY = "pbt09-todos";

const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const todoCount = document.querySelector("#todoCount");
const clearCompletedBtn = document.querySelector("#clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");

let todos = loadTodos();
let activeFilter = "all";
let editingTodoId = null;

function loadTodos() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return [];
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        return [];
    }
}

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function createTodo(text) {
    return {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
    };
}

function getVisibleTodos() {
    if (activeFilter === "active") {
        return todos.filter(todo => !todo.completed);
    }

    if (activeFilter === "completed") {
        return todos.filter(todo => todo.completed);
    }

    return todos;
}

function updateCount() {
    const remaining = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${remaining} item${remaining === 1 ? "" : "s"} left`;
}

function setActiveFilter(filter) {
    activeFilter = filter;
    filterButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.filter === filter);
    });
    renderTodos();
}

function renderTodos() {
    todoList.textContent = "";
    const visibleTodos = getVisibleTodos();

    if (visibleTodos.length === 0) {
        const emptyState = document.createElement("li");
        emptyState.className = "empty-state";
        emptyState.textContent = "No todos here yet.";
        todoList.appendChild(emptyState);
        updateCount();
        return;
    }

    visibleTodos.forEach(todo => {
        const item = document.createElement("li");
        item.className = `todo-item${todo.completed ? " completed" : ""}`;
        item.dataset.id = todo.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.checked = todo.completed;
        checkbox.setAttribute("aria-label", `Toggle ${todo.text}`);

        const text = document.createElement("span");
        text.className = "todo-text";
        text.textContent = todo.text;
        text.title = "Double-click to edit";
        text.tabIndex = 0;

        const actions = document.createElement("div");
        actions.className = "todo-actions";

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "icon-btn edit";
        editButton.dataset.action = "edit";
        editButton.textContent = "✎";
        editButton.setAttribute("aria-label", `Edit ${todo.text}`);

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "icon-btn delete";
        deleteButton.dataset.action = "delete";
        deleteButton.textContent = "❌";
        deleteButton.setAttribute("aria-label", `Delete ${todo.text}`);

        actions.append(editButton, deleteButton);
        item.append(checkbox, text, actions);
        todoList.appendChild(item);
    });

    updateCount();
}

function startEditing(todoId) {
    editingTodoId = todoId;
    renderTodos();

    const item = todoList.querySelector(`[data-id="${todoId}"]`);
    if (!item) {
        return;
    }

    const todo = todos.find(entry => entry.id === todoId);
    if (!todo) {
        return;
    }

    const text = item.querySelector(".todo-text");
    text.textContent = "";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "todo-edit";
    editInput.value = todo.text;
    editInput.setAttribute("aria-label", "Edit todo text");

    item.insertBefore(editInput, item.querySelector(".todo-actions"));
    editInput.focus();
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);
}

function finishEditing(save = true) {
    const item = todos.find(entry => entry.id === editingTodoId);
    const editingElement = todoList.querySelector(`[data-id="${editingTodoId}"] .todo-edit`);

    if (save && item && editingElement) {
        const nextText = editingElement.value.trim();
        if (nextText) {
            item.text = nextText;
        }
    }

    editingTodoId = null;
    saveTodos();
    renderTodos();
}

function addTodo(text) {
    const nextText = text.trim();
    if (!nextText) {
        return;
    }

    todos.push(createTodo(nextText));
    saveTodos();
    renderTodos();
}

function toggleTodo(todoId) {
    const todo = todos.find(entry => entry.id === todoId);
    if (!todo) {
        return;
    }

    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(todoId) {
    todos = todos.filter(todo => todo.id !== todoId);
    saveTodos();
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo(todoInput.value);
    todoInput.value = "";
    todoInput.focus();
});

todoList.addEventListener("click", (event) => {
    const todoItem = event.target.closest(".todo-item");
    if (!todoItem) {
        return;
    }

    const todoId = todoItem.dataset.id;

    if (event.target.matches(".todo-checkbox")) {
        toggleTodo(todoId);
        return;
    }

    if (event.target.matches('[data-action="delete"]')) {
        deleteTodo(todoId);
        return;
    }

    if (event.target.matches('[data-action="edit"]')) {
        startEditing(todoId);
        return;
    }

    if (event.target.matches(".todo-text")) {
        toggleTodo(todoId);
    }
});

todoList.addEventListener("dblclick", (event) => {
    const todoText = event.target.closest(".todo-text");
    if (!todoText) {
        return;
    }

    const todoItem = todoText.closest(".todo-item");
    if (todoItem) {
        startEditing(todoItem.dataset.id);
    }
});

todoList.addEventListener("keydown", (event) => {
    if (event.target.matches(".todo-edit") && event.key === "Enter") {
        finishEditing(true);
    }
});

todoList.addEventListener("blur", (event) => {
    if (event.target.matches(".todo-edit")) {
        finishEditing(true);
    }
}, true);

clearCompletedBtn.addEventListener("click", clearCompleted);

filterButtons.forEach(button => {
    button.addEventListener("click", () => setActiveFilter(button.dataset.filter));
});

renderTodos();
