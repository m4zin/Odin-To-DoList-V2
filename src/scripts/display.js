const display = (function() {

    // Buttons to display quick tasks manager / form.
    const quickTasksBtn = document.querySelector('.quick-tasks')
    const taskFormBtn = document.querySelector('.add-task-btn')

    // Divs for Quick tasks manager / form.
    const quickTasksManager = document.querySelector('.quick-tasks-manager')
    const quickTaskForm = document.querySelector('.create-task-form')

    // Displaying quick task list / form
    function taskOrForm() {
        quickTasksBtn.addEventListener('click', () => {
            quickTaskForm.style.display = 'none'
            quickTasksManager.style.display = 'grid'
        })

        taskFormBtn.addEventListener('click', () => {
            quickTasksManager.style.display = 'none'
            quickTaskForm.style.display = 'flex'
        })
    }

    return {
        taskOrForm
    }

})()

export {display}