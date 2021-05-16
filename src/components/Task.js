// We treat React-Icons like React Components
import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} 
            onDoubleClick= {() => onToggle(task.id)}>
            <h3>
                {task.description} 
                <FaTimes 
                style = {{color: 'red'}}
                // Why does it call all of them if
                // you don't make this an anonymous func?
                onClick = {() => onDelete(task.id)} />
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task