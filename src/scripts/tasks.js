import { display } from "./display";
import { storage } from "./localStorage";

const tasks = (function () {

    // Main div to append the tasks to.
    const listOfTasks = document.querySelector('.list-of-quick-tasks')

    // Variable to store the referenced task
    let editingTask = null

    // projects div
    const projects = document.querySelector('.projects')

    // selected proj
    let currProjList = null

    // Edit task for quick or project
    let editQuickTask = null
    let editProjTask = null

    function task(title, desc, date, priority) {
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.priority = priority
    }

    // Creating element with tag and class name.
    function createElem(tag, name) {
        const elem = document.createElement(tag)
        elem.className = name;

        return elem
    }

    // Checking if any field in task form is empty.
    function checkIfEmpty(value) {
        return value === '' ? 'empty' : value;
    }

    // Quickly fill editing form with old task vals.
    function fillEditForm(inputID, val) {
        let input = document.getElementById(inputID)
        input.value = val
    }

    // Deleting task from local storage if deleted from project.
    function delTaskFromProj(taskName, task) {
        // Trasversing back from the title to the project to reach the project's name.
        let project = taskName.closest('.project')
        // Traversing back to the task from title.
        task = taskName.closest('.task')

        // Project name to be compared to the key in local storage
        let projectName = project.querySelector('.proj-name').innerHTML

        let taskNameInnerHTML = taskName.innerHTML

        // Getting the required key from local stroage.
        let key = localStorage.getItem(projectName);

        // Parsing it.
        let arrOfObjects = JSON.parse(key)

        // Object to removed from the array of objects
        let objToRemove = {title: taskNameInnerHTML}

        // Use the filter method to create a new array without the specified object
        let newArray = arrOfObjects.filter(obj => obj.title !== objToRemove.title);

        // Updating local storage with the new array.
        localStorage.setItem(projectName, JSON.stringify(newArray));

        console.log(newArray);
    }

    // Deleting task from local stroage if deleted from quick task manager.
    function delTaskFromQT(title) {
        // Retrieve the local storage data
        const quickTasksString = localStorage.getItem("quickTasks");

        // Parse the JSON string to get the array of tasks
        const quickTasks = JSON.parse(quickTasksString) || [];

        // Specify the title you want to delete
        const titleToDelete = title; 

        // Loop through the tasks to find and delete the task with the specified title
        for (let i = 0; i < quickTasks.length; i++) {
            if (quickTasks[i].title === titleToDelete) {
                // Remove the task with the specified title
                quickTasks.splice(i, 1);

                // Update the local storage with the modified array
                localStorage.setItem("quickTasks", JSON.stringify(quickTasks));

                // Break out of the loop since the task is found and deleted
                break;
            }
        }
    }

    // Deleting/Editing a task
    function editOrDelTask(e) {
        // closest task to clicked btn.
        const task = e.target.closest('.task')

        const prevTitle = task.querySelector('.task-name')
        const prevDesc = task.querySelector('.task-desc')
        const prevDate = task.querySelector('.task-date')
        const prevPriority = task.querySelector('.task-priority')

        if (e.target.className == 'del-task-btn' || e.target.id == 'checkbox') {
            if(task.closest('.list-of-quick-tasks')) {
                delTaskFromQT(prevTitle.innerHTML)
            } else {
                // Del task from proj.
                delTaskFromProj(prevTitle, task)
            }
            task.remove()
        }
        else if (e.target.className == 'edit-task-btn') {
            editingTask = task

            if(e.target.closest('.list-of-quick-tasks')) {
                // Displaying the edit form
                display.editForm()
                editQuickTask = true
            } else if(e.target.closest('.list-of-proj-tasks')) {
                // Displaying the edit form for project task
                display.editProjTaskForm()
                editProjTask = true
            }

            fillEditForm('editTitle', prevTitle.innerHTML)
            fillEditForm('editDescription', prevDesc.innerHTML)
            fillEditForm('editDate', prevDate.innerHTML.split(' ')[1])
            fillEditForm('editPriority', prevPriority.innerHTML.split(' ')[0])
        }
    }

    // Creating task div and it's various diff child elements.
    function taskDivInDOM(title, desc, date, prority, currDiv) {

        // First main child (Task).
        const task = createElem('div', 'task')

        // listOfTasks.append(task)
        currDiv.append(task)

        // Children of task.
        const nameDescDate = createElem('div', 'name-desc-date')
        const checkPriorEditDel = createElem('div', 'checkbox-priority-edit-delete')

        task.append(
            nameDescDate,
            checkPriorEditDel
        )

        // Chidlren of nameDescDate
        let taskName = createElem('h2', 'task-name')
        let taskDesc = createElem('h3', 'task-desc')
        let taskDate = createElem('h2', 'task-date')

        taskName.innerHTML = title
        taskDesc.innerHTML = desc
        taskDate.innerHTML = `Due ${date}`

        nameDescDate.append(
            taskName,
            taskDesc,
            taskDate
        )

        // Children of checkPriorEditDel
        const taskCheckbox = createElem('div', 'task-checkbox')
        let taskPrior = createElem('p', 'task-priority')
        taskPrior.innerHTML = `${prority} priority`
        const taskEditDel = createElem('div', 'edit-delete-btn')

        checkPriorEditDel.append(
            taskCheckbox,
            taskPrior,
            taskEditDel
        )

        // Children of taskCheckbox
        const inputCheck = document.createElement('input')
        inputCheck.type = 'checkbox'
        inputCheck.id = 'checkbox'
        const inputLabel = document.createElement('label')
        inputLabel.setAttribute('for', 'checkbox')
        inputLabel.innerHTML = ' Done '

        taskCheckbox.append(
            inputCheck,
            inputLabel
        )

        // Children of taskEditDel
        const editBtn = createElem('button', 'edit-task-btn')
        editBtn.innerHTML = 'Edit'
        const delBtn = createElem('button', 'del-task-btn')
        delBtn.innerHTML = 'Delete'

        taskEditDel.append(
            editBtn,
            delBtn
        )

        delBtn.addEventListener('click', editOrDelTask)
        inputCheck.addEventListener('click', editOrDelTask)
        editBtn.addEventListener('click', editOrDelTask)
    }

    function fillTaskInfo(e) {

        // Checking if any fields are empty.
        const getFieldValue = (id) => checkIfEmpty(document.getElementById(id).value);

        // Task values for filling deets in new form.
        let taskTitle = getFieldValue('title');
        let taskDesc = getFieldValue('description');
        let taskDate = getFieldValue('date');
        let taskPriority = getFieldValue('priority');

        // Edited task values in form.
        let editedTaskTitle = getFieldValue('editTitle');
        let editedTaskDesc = getFieldValue('editDescription');
        let editedTaskDate = getFieldValue('editDate');
        let editedTaskPriority = getFieldValue('editPriority');

        // Proj task values in form.
        let projTaskTitle = getFieldValue('projTaskTitle');
        let projTaskDesc = getFieldValue('projTaskDescription');
        let projTaskDate = getFieldValue('projTaskDate');
        let projTaskPriority = getFieldValue('projTaskPriority');

        if (e.target.className == 'task-submit-btn') {
            const tasks = listOfTasks.querySelectorAll('.task-name')

            for(let i = 0; i < tasks.length; i++)
            {
                if(tasks[i].innerHTML == taskTitle) 
                {
                    alert('Sorry this task title already exists, Add another unique title.')
                    return
                }
            }

            let newTask = new task(
                taskTitle,
                taskDesc,
                taskDate,
                taskPriority
            )

            // Adding task to local storage.
            storage.addTask(newTask.title, newTask.desc, newTask.date, newTask.priority)

            // Adding task div along with filled information.
            taskDivInDOM(
                newTask.title,
                newTask.desc,
                newTask.date,
                newTask.priority,
                listOfTasks
            )

            display.tasks()
        } 
        else if (e.target.className == 'edit-task-submit-btn') {
            // filling edited task with new values
            editingTask.querySelector('.task-name').innerHTML = editedTaskTitle
            editingTask.querySelector('.task-desc').innerHTML = editedTaskDesc
            editingTask.querySelector('.task-date').innerHTML = `Due ${editedTaskDate}`
            editingTask.querySelector('.task-priority').innerHTML = `${editedTaskPriority} priority`

            if(editQuickTask) {
                display.tasks()
                editQuickTask = false
            } else if(editProjTask) {
                display.projAfterEditTask()
                editProjTask = false
            } 
        }
        else if (e.target.className == 'proj-task-submit-btn') {
            const currProj = currProjList.closest('.project')
            const currProjName = currProj.querySelector('.proj-name').innerHTML
            const taskNames = currProjList.querySelectorAll('.task-name')

            for(let i = 0; i < taskNames.length; i++) 
            {
                if(taskNames[i].innerHTML == projTaskTitle) {
                    alert('Sorry this task title already exists, Add another unique title.')
                    return
                }
            }

            let newProjTask = new task(
                projTaskTitle,
                projTaskDesc,
                projTaskDate,
                projTaskPriority
            )

            storage.addTaskToProj(
                newProjTask.title, 
                newProjTask.desc, 
                newProjTask.date, 
                newProjTask.priority, 
                currProjName)

            // Adding task div along with filled information.
            taskDivInDOM(
                newProjTask.title,
                newProjTask.desc,
                newProjTask.date,
                newProjTask.priority,
                currProjList
            )
            display.proj()
        }
    }

    function goBackToProj() {
        currProjList.closest('.project').style.display = 'grid'
        display.proj()
    }

    function addOrEditTask() {
        const taskSubmit = document.querySelector('.task-submit-btn')
        const editedTaskSubmit = document.querySelector('.edit-task-submit-btn')
        const projTaskSubmit = document.querySelector('.proj-task-submit-btn')
        const goBackBtnForProj = document.querySelector('.go-back-to-proj')

        taskSubmit.addEventListener('click', fillTaskInfo)
        editedTaskSubmit.addEventListener('click', fillTaskInfo)

        // Getting selected project.
        projects.addEventListener('click', (e) => {
            if(e.target.className == 'add-task-to-proj-btn') {
                currProjList = e.target.closest('.project').querySelector('.list-of-proj-tasks')
            }
        })
        projTaskSubmit.addEventListener('click', fillTaskInfo)
        goBackBtnForProj.addEventListener('click', goBackToProj)
    }

    return {
        addOrEditTask,
        taskDivInDOM
    }

})()

export { tasks }