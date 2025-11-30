// Run script after the HTML has fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------
    // Select DOM Elements
    // -------------------------------
    const addButton = document.getElementById("add-task-btn");   // Add Task button
    const taskInput = document.getElementById("task-input");  // Input field
    const taskList = document.getElementById("task-list");    // Task list (ul)

    // In-memory array of tasks (strings)
    let tasks = [];

    // -------------------------------
    // addTask Function
    // - can be called as addTask() when adding from input
    // - or addTask(taskText, false) when loading from localStorage
    // -------------------------------
    function addTask(taskTextParam, save = true) {
        // If a taskTextParam is provided (loading from storage), use it.
        // Otherwise read from the input field.
        const taskText = (typeof taskTextParam === "string")
            ? taskTextParam.trim()
            : taskInput.value.trim();

        // Only create task if taskText is NOT empty
        if (taskText !== "") {

            // Create li and text node (so we can read text cleanly later)
            const li = document.createElement("li");
            const textNode = document.createTextNode(taskText);
            li.appendChild(textNode);

            // Create remove button
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-btn");

            // Remove li when remove button is clicked AND update localStorage
            removeBtn.onclick = function () {
                // Remove from DOM
                taskList.removeChild(li);

                // Remove from tasks array (remove first matching occurrence)
                const idx = tasks.indexOf(taskText);
                if (idx > -1) {
                    tasks.splice(idx, 1);
                    // Update localStorage
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }
            };

            // Append remove button to li and li to task list
            li.appendChild(removeBtn);
            taskList.appendChild(li);

            // If this call should save to localStorage (not when loading),
            // update tasks array and save it.
            if (save) {
                // Reload stored tasks into tasks array to ensure sync
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                storedTasks.push(taskText);
                tasks = storedTasks; // update in-memory array
                localStorage.setItem('tasks', JSON.stringify(tasks));
            } else {
                // If not saving (loading), ensure in-memory tasks array is synced
                tasks.push(taskText);
            }

            // Clear input only when this was a user-driven add (no param)
            if (typeof taskTextParam !== "string") {
                taskInput.value = "";
                taskInput.focus();
            }

        } else {
            // If empty, alert user (required structure)
            alert("Please enter a task.");
        }
    }

    // -------------------------------
    // Load tasks from localStorage and render them
    // -------------------------------
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks.slice(); // copy to in-memory array
        storedTasks.forEach(taskText => {
            // call addTask with save = false to avoid re-saving
            addTask(taskText, false);
        });
    }

    // -------------------------------
    // Attach Event Listeners
    // -------------------------------

    // Click Add Task button
    addButton.addEventListener("click", function () {
        addTask(); // user-driven add (reads input, saves)
    });

    // Press Enter key to add task (using keypress per assignment)
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load tasks when DOM content is loaded
    loadTasks();

});
