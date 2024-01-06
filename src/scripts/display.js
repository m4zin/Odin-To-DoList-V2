const display = (function() {
    // Button & div for quick tasks manager.
    const tasksBtn = document.querySelectorAll('.quick-tasks')
    const tasksDiv = document.querySelector('.quick-tasks-manager')

    // Button & div for task info form.
    const formDiv = document.querySelector('.create-task-form')
    const formBtn = document.querySelector('.add-task-btn')

    // After task submission
    const formSubmit = document.querySelector('.task-submit-btn')

    function displayTasks() {
        formDiv.style.display = 'none';
        tasksDiv.style.display = 'grid';
    }
    
    // Displaying tasks div when clicking on,
        // sidebar quick tasks button,
        // Form go back / add task button.
    function tasks() {
        tasksBtn.forEach(btn => btn.addEventListener('click', displayTasks));
        formSubmit.addEventListener('click', displayTasks)
    }

    // Displaying form div.
    function form() {
        formBtn.addEventListener('click', () => {
            tasksDiv.style.display = 'none'
            formDiv.style.display = 'flex'
        })
    }

    return {
        tasks,
        form
    }
})()

export {display}