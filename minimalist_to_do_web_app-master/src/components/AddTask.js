import {useState} from "react"

function AddTask({onAdd}) {

    const[text,setText] = useState("")
    const[day,setDate] = useState("")
    const[priority,setpriority] = useState(false)


    const onSubmit = (e) => {
        e.preventDefault()

        if(!text){
            alert("Please Add A Task")
            return
        }
        onAdd({text, day, priority})

        setText("")
        setDate("")
        setpriority(false)
    }
    
    return (
        <form className="add-form" onSubmit={onSubmit}>

            <div className="form-control">
                <label>Task</label>
                <input 
                    type="text"
                    placeholder="Add Task"
                    value={text}
                    onChange= {(e)=>setText(e.target.value)}
                />
            </div>

            <div className="form-control">
                <label>Date & Time</label>
                <input type="text" placeholder="Add Day & Time" value={day}
                    onChange= {(e)=>setDate(e.target.value)}/>
            </div>

            <div className="form-control form-control-check">
                <label>High Priority</label>
                <input type="checkbox" value={priority} checked={priority}
                    onChange= {(e)=>setpriority(e.currentTarget.checked)}/>
            </div>

            <input type="submit" value="Save Task" className= "btn btn-block"/>
            
        </form>
    )
}

export default AddTask
