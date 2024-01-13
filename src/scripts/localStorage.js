import { tasks } from "./tasks"

const storage = (function () {

    const quickTaskList = document.querySelector('.list-of-quick-tasks')

    function getQuickTasks() {
        // If quick tasks doesn't exist then fall back to empty array.
        return JSON.parse(localStorage.getItem('quickTasks')) || [];
    }

    // Saving tasks to local storage
    function saveTasks(task) {
        localStorage.setItem("quickTasks", JSON.stringify(task));
    }

    // Finally function to add the task.
    function addTask(title, desc, date, priority) {
        let task = getQuickTasks()
        task.push({title, date, desc, priority})
        saveTasks(task)
    }

    // Displaying data on page load.
    function insertQuickTasks() {
        let retrievedTasks = getQuickTasks()
        retrievedTasks.forEach(task => {
            tasks.taskDivInDOM(
                task.title,
                task.desc,
                task.date,
                task.priority,
                quickTaskList
            )
        })
    }

    // Adding task to project
    function addTaskToProj(title, desc, date, priority, project) {
        let projName = JSON.parse(localStorage.getItem(project))
        let task = {title, desc, date, priority}
        projName.push(task)
        localStorage.setItem(project, JSON.stringify(projName))
    }

    return {
        addTask,
        insertQuickTasks,
        addTaskToProj
    }
})()

export {storage}