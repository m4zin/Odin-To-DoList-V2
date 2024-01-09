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
                project.style.display = 'block'; // or set any other appropriate display property
            } else {
                // Hide other projects
                project.style.display = 'none';
            }
        }
    }

    // find if proj name and div classnames are equal, then
    // display proj's respective div.
    function selectProjDiv(e) {
        projects.style.display = 'grid'
        quickTasks.style.display = 'none'
        const projBtn = e.target.dataset.btnId;

        getProjDiv(projBtn)
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

            //div containing task addition / edition / deletion.
            // const projTaskManager = document.createElement('div')
            const testStuff = document.createElement('h1')
            testStuff.innerHTML = projName

            getProjDiv(projBtn)

            project.append(testStuff)
            project.setAttribute('data-proj-id', count)

            projects.append(
                project
            )
        })()

        count = count + 1

    }

    addProjBtn.addEventListener('click', () => {
        addProj()
        display.closeInputBarProjName()
    })

    projBtns.addEventListener('click', selectProjDiv)

})()

export { projects }