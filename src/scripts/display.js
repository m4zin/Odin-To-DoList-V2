const display = (function() {
    // Buttons w/ related div for quick tasks manager.
    const tasksBtn = document.querySelectorAll('.quick-tasks')
    const tasksDiv = document.querySelector('.quick-tasks-manager')

    // Buttons w/ related div for task info form.
    const formDiv = document.querySelector('.create-task-form')
    const formBtn = document.querySelector('.add-task-btn')

    // Button to submit task.
    const formSubmit = document.querySelector('.task-submit-btn')

    function tasks() {
        formDiv.style.display = 'none';
        tasksDiv.style.display = 'grid';
    }

    function form() {
        tasksDiv.style.display = 'none'
        formDiv.style.display = 'flex'
    }
    
    tasksBtn.forEach(btn => btn.addEventListener('click', tasks));
    formSubmit.addEventListener('click', tasks)
    formBtn.addEventListener('click', form)

    return {
        tasks,
        form
    }
})()

export {display}