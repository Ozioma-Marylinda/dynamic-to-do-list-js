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

        if (taskText !== "") {

            // Create li
            const li = document.createElement("li");
            li.textContent = taskText;

            // Create remove button
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.className = "remove-btn";

            // Remove li when remove button is clicked
            removeBtn.onclick = function () {
                taskList.removeChild(li);
            };

            // Append remove button to li
            li.appendChild(removeBtn);

            // Append li to task list
            taskList.appendChild(li);

            // Clear input field
            taskInput.value = "";
    }


    // Add click event to Add Task button
    addButton.addEventListener("click", addTask);


    // Add Enter key support
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

});
