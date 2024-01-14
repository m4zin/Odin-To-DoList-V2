import { projects } from "./projects";
import { tasks } from "./tasks"

const storage = (function () {

    const quickTaskList = document.querySelector('.list-of-quick-tasks')

    const projBtnList = document.querySelector('.proj-btns')
    const projectList = document.querySelector('.projects')

    function getQuickTasks() {
        // If quick tasks doesn't exist then fall back to empty array.
        return JSON.parse(localStorage.getItem(' ')) || [];
    }

    // Saving tasks to local storage
    function saveTasks(task) {
        localStorage.setItem(" ", JSON.stringify(task));
    }

    // Finally function to add the task.
    function addTask(title, desc, date, priority) {
        let task = getQuickTasks()
        task.push({ title, date, desc, priority })
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
        let task = { title, desc, date, priority }
        projName.push(task)
        localStorage.setItem(project, JSON.stringify(projName))
    }

    function addProjBtn() {
        // Loop through all keys in local storage
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            // Exclude the key "quicktasks"
            if (key !== ' ') {
                // Do something with the key and its corresponding value
                projects.addProjBtnToSideBar(key)
                addDivToProj(key)
            }
        }   
    }

    function addDivToProj() {
        let projBtn = projBtnList.querySelectorAll('button')
        let project = projectList.querySelectorAll('h2')
        
        for(let i = 0; i < projBtn.length; i++)
        {
            if(projBtn[i].innerHTML == project[i].innerHTML) {
                let currList = project[i].closest('.project').querySelector('.list-of-proj-tasks')

                // Retrieve the JSON string from local storage
                const jsonString = localStorage.getItem(projBtn[i].innerHTML);

                // Parse the JSON string to get an array of objects
                const arrayOfObjects = JSON.parse(jsonString);

                // Iterate through the array of objects
                for (const obj of arrayOfObjects) {
                    let title = obj.title
                    let desc = obj.desc
                    let date = obj.date
                    let priority = obj.priority

                    tasks.taskDivInDOM(
                        title,
                        desc,
                        date,
                        priority,
                        currList
                    )
                }
            }
        }
    }

    return {
        addTask,
        insertQuickTasks,
        addTaskToProj,
        addProjBtn
    }
})()

export { storage }