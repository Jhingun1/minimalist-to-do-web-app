import PropTypes from 'prop-types'
import Button from "./Button"
import {useLocation} from "react-router-dom"


const Header = ({title, onChangeAddTask, showAddTaskStatus}) => {

    const location = useLocation();
    const path = location.pathname

    const add = ()=>{
        
        console.log({showAddTaskStatus})
        onChangeAddTask(showAddTaskStatus)
        console.log({showAddTaskStatus})
    }



    console.log(path === "/");

    return (
        <header className="header">
            <h1>{title}</h1>
             {path === "/" ? (<Button color= "red" text = {showAddTaskStatus ?  "Collapse" : "Add Task"} onClick={add}/>): null}
            
        </header >
    )
} 

Header.defaultProps = {
    title: "To-Do"
}

Header.propTypes = {
    title: PropTypes.string.isRequired, 
}

// const headingStyle = {
//     color: "red",
//     backgroundColor: "black"
// }

export default Header
