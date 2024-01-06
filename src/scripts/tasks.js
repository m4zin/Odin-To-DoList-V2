import { display } from "./display";

const tasks = (function() {
    function task(title, desc, date, priority) {
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.priority = priority
    }

    function createElem(tag, name) {
        const elem = document.createElement(tag)
        elem.className = name;
    
        return elem
    }

    // Creating task div and it's various diff child elements.
    function taskDivInDOM(title, desc, date, prority) {
        // Main div to append the tasks to.
        const listOfTasks = document.querySelector('.list-of-quick-tasks')

        // First main child (Task).
        const task = createElem('div', 'task')
        listOfTasks.append(task)

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
    }

    function fillTaskInfo() {
        //Task values from form. 
        let taskTitle = document.getElementById('title').value;
        let taskDesc = document.getElementById('description').value;
        let taskDate = document.getElementById('date').value;
        let taskPriority = document.getElementById('priority').value;

        let newTask = new task(
            taskTitle,
            taskDesc,
            taskDate,
            taskPriority
        )

        // Adding task div along with filled information.
        taskDivInDOM(
            newTask.title,
            newTask.desc,
            newTask.date,
            newTask.priority
        )

        // Going back to task list after adding task.
        display.tasks()
    }

    function submitTask() {
        const taskSubmit = document.querySelector('.task-submit-btn')
        taskSubmit.addEventListener('click', fillTaskInfo)
    }

    return {
        submitTask
    }

})()

export {tasks}