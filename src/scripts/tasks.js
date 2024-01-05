function task(title, desc, date, priority) {
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.priority = priority
}

const addTaskToList = (function() {
    //Task values from form. 
    const taskTitle = document.getElementById('title').value;
    const taskDesc = document.getElementById('description').value;
    const taskDate = document.getElementById('date').value;
    const taskPriority = document.getElementById('priority').value;

    function addTaskToDOM() {
        const newTask = new task(
            taskTitle,
            taskDesc,
            taskDate,
            taskPriority
        )
    }
})()

export {addTaskToList}