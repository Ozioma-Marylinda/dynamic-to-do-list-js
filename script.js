// Run script after the HTML has fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------
    // Select DOM Elements
    // -------------------------------
    const addButton = document.getElementById("add-task-btn"); // Add Task button
    const taskInput = document.getElementById("task-input"); // Input field
    const taskList = document.getElementById("task-list");   // Task list (ul)


    // -------------------------------
    // addTask Function
    // -------------------------------
    function addTask() {
        // Retrieve and trim the input
        const taskText = taskInput.value.trim();

        // Check if empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create <li> element and set its text safely
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(taskText));

        // Create Remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Remove task when button is clicked (use addEventListener + li.remove())
        removeBtn.addEventListener("click", () => {
            li.remove();
        });

        // Attach remove button to li
        li.appendChild(removeBtn);

        // Add li to the task list
        taskList.appendChild(li);

        // Clear input
        taskInput.value = "";
        taskInput.focus();
    }

    // -------------------------------
    // Attach Event Listeners
    // -------------------------------

    // Click Add Task button
    addButton.addEventListener("click", addTask);

    // Press Enter key to add task — use keydown and preventDefault to avoid form submit
    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });

    // NOTE: Do not call addTask() on load (it would try to add an empty task).
});

