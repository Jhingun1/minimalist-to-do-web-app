import {FaCalendarMinus, FaClock, FaExclamation, FaMinusSquare, FaTimes, FaTrash, FaTrashAlt} from "react-icons/fa"

const Task = ({ task, onDelete , onToggle}) => {
    return (
        <div className= {task.priority ? "task reminder" : "task"} >
            <h3>{task.text}
                <div>
                    <FaExclamation style={{marginRight: 10 , color: task.priority ? "red" : "lightGrey"}} onClick={()=>onToggle(task.id)}/>
                    <FaTrash style={{color:"red"}} onClick={()=>onDelete(task.id)}/>
                </div>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
