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

        // Create <li> element
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Remove task when button is clicked
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Attach remove button to li
        li.appendChild(removeBtn);

        // Add li to the task list
        taskList.appendChild(li);

        // Clear input
        taskInput.value = "";
    }


    // -------------------------------
    // Attach Event Listeners
    // -------------------------------

    // Click Add Task button
    addButton.addEventListener("click", addTask);

    // Press Enter key to add task
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Invoke addTask on DOMContentLoaded (as instructed)
    addTask();

});

