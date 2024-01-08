const display = (function() {
    // Buttons w/ related div for quick tasks manager.
    const tasksBtn = document.querySelectorAll('.quick-tasks')
    const tasksDiv = document.querySelector('.quick-tasks-manager')

    // Buttons w/ related div for task info form.
    const formDiv = document.querySelector('.create-task-form')
    const addTaskBtn = document.querySelector('.add-task-btn')
    const editFormDiv = document.querySelector('.edit-task-form')

    // Button to submit task.
    const formSubmitBtn = document.querySelector('.task-submit-btn')

    function tasks() {
        formDiv.style.display = 'none';
        editFormDiv.style.display = 'none';
        tasksDiv.style.display = 'grid';
    }

    function form() {
        tasksDiv.style.display = 'none'
        formDiv.style.display = 'flex'
    }

    function editForm() {
        tasksDiv.style.display = 'none'
        editFormDiv.style.display = 'flex'
    }
    
    tasksBtn.forEach(btn => btn.addEventListener('click', tasks));
    formSubmitBtn.addEventListener('click', tasks)
    addTaskBtn.addEventListener('click', form)

    return {
        tasks,
        form,
        editForm
    }
})()

export {display}