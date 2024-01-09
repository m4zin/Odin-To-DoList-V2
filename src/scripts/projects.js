import { display } from "./display"

const projects = (function () {
    const addProjBtn = document.querySelector('.add-proj')

    function addProj() {
        // Input value
        const projName = document.getElementById('projectName').value

        // Div to append the projects buttons to 
        const projBtns = document.querySelector('.proj-btns')

        // Button to open new project
        const projBtn = document.createElement('button')
        projBtn.className = 'proj-btn'
        projBtn.innerHTML = projName

        projBtns.append(
            projBtn
        )
    }

    addProjBtn.addEventListener('click', () => {
        addProj()
        display.closeInputBarProjName()
    })

})()

export { projects }