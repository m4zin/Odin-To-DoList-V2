import { display } from "./display"

const projects = (function () {

    // Proj count to set unique IDs
    let count = 0

    // Sidebar button to add project
    const addProjBtn = document.querySelector('.add-proj')

    // Each project div
    const projects = document.querySelector('.projects')

    // Sidebar button to access project.
    const projBtns = document.querySelector('.proj-btns')

    // Hiding quick tasks div if present
    const quickTasks = document.querySelector('.quick-tasks-manager')

    function getProjDiv(projBtn) {
        // Loop through the project elements and hide all except the one with the target data attribute
        for (let i = 0; i < projects.children.length; i++) {
            let project = projects.children[i];

            // Check if the project has the target data attribute
            if (project.dataset.projId === projBtn) {
                // Display the target project
                project.style.display = 'grid'; // or set any other appropriate display property
            } else {
                // Hide other projects
                project.style.display = 'none';
            }
        }
    }

    // find if proj name and div classnames are equal, then
    // display proj's respective div.
    function selectProjDiv(e) {
        if(e.target.tagName === 'BUTTON') {
            projects.style.display = 'grid'
            quickTasks.style.display = 'none'
            const projBtn = e.target.dataset.btnId;
            getProjDiv(projBtn)
        }
    }

    function addProj() {
        // Input value
        const projName = document.getElementById('projectName').value

        // Button to open new project
        const projBtn = document.createElement('button')
        // Setting the project name for the btn
        projBtn.innerHTML = projName
        // Setting a data attribute for proj button - div linkage purposes.
        projBtn.setAttribute('data-btn-id', count)

        projBtns.append(
            projBtn
        )

        const createProjDiv = (function () {
            const project = document.createElement('div')
            project.className = 'project'

            // Now appending all the elements that would comprise a project
            // the task manager
            const projTaskManager = document.createElement('div')
            projTaskManager.className = 'project-task-manager'

            // project heading and add task btn.
            const projHeading = document.createElement('h2')
            projHeading.innerHTML = projName

            // Button add task to pojrect
            const addTaskToProjBtn = document.createElement('button')
            addTaskToProjBtn.className = 'add-task-to-proj-btn'
            addTaskToProjBtn.innerHTML = 'Click me to add a task to this project +'

            // Appending heading and add task button to task manager div
            projTaskManager.append(
                projHeading,
                addTaskToProjBtn
            )

            // the list comprising of the tasks in a proj
            const taskList = document.createElement('div')
            taskList.className = 'list-of-proj-tasks'

            // Appending task manager and proj tasks to project div
            project.append(
                projTaskManager,
                taskList
            )

            project.setAttribute('data-proj-id', count)

            projects.append(
                project
            )

            projects.style.display = 'none'

            getProjDiv(projBtn)
        })()

        count = count + 1
    }

    function addTaskToProj(e) {
        // Project id of clicked add task button
        const clickedProjID = e.target.closest('.project').dataset.projId;

        console.log(clickedProjID)
    }

    addProjBtn.addEventListener('click', () => {
        addProj()
        display.closeInputBarProjName()
    })

    projBtns.addEventListener('click', selectProjDiv)
    projects.addEventListener('click', addTaskToProj)

})()

export { projects }