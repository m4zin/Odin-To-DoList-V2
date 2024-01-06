import '../css/styles.css'
import { display } from './display'
import { tasks } from './tasks'

const buttons = (function() {

    // Displaying different divs on btn clicks.
    display.tasks()
    display.form()
    
    tasks.submitTask()

})()