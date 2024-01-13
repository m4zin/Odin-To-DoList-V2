import '../css/styles.css'
import { tasks } from './tasks.js'
import { projects } from './projects.js';
import { storage } from './localStorage.js';

(function quickTasks() {
    // Addition of task after filling form.
    tasks.addOrEditTask()

    // Inserting quick tasks
    storage.insertQuickTasks()

})();
