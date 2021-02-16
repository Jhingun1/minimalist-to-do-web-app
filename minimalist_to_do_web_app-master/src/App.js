import {useEffect} from "react"
import {BrowserRouter as Router, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tasks from "./components/Tasks"
import AddTasks from "./components/AddTask"
import About from "./components/About"
import React from "react"
import { Switch, withRouter }  from 'react-router-dom';
import {useState} from "react"
import { FaTrashAlt } from "react-icons/fa"






function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])


useEffect(()=> {

  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }

  getTasks()
}, [])

function sortByPriority(list) {
  const dataSorted = list.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
  const sortedList = dataSorted.reverse()
  return sortedList
}

const fetchTasks = async () => {
  const res = await fetch("http://localhost:5000/tasks")
  const  data = await res.json()

  return sortByPriority(data)

}

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const  data = await res.json()
  return data

}

const deleteTask = async (id)=>  {

  console.log(id)

  await fetch(`http://localhost:5000/tasks/${id}`, {
    method : "DELETE",
  })



  setTasks(tasks.filter((task)=>{return task.id!==id}))
}

const toggleAddTask = (showAddTaskValue)=>{
    setShowAddTask(!showAddTaskValue)
  
}

const togglepriority = async (id, activityStatus )=>{

  const taskToToggle = await fetchTask(id)
  const updTaska = {...taskToToggle, priority: !taskToToggle.priority}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-type":"application/json"
    }, 
    body: JSON.stringify(updTaska)
  })

  const data = await res.json()

  setTasks(tasks.map((task)=> task.id === id ? {...task, priority: updTaska.priority} : task))


}

const addTask = async (task) => {
  const res = await fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: {
      "Content-type":"application/json"
    }, 
    body: JSON.stringify(task)
  })

  const data = await res.json()

  const newList = [...tasks, data]
  const sortedNewList = sortByPriority(newList)

  setTasks(sortedNewList)

}

  return (
    <Router>
    <div className="container">
      <Header onChangeAddTask = {toggleAddTask} showAddTaskStatus = {showAddTask}/> 
      
      <Route path= "/" exact render={(props)=> (
        <>
            {showAddTask && <AddTasks onAdd={addTask}/>} 
            {tasks.length > 0 ? <Tasks tasks= {tasks} onToggle= {togglepriority} onDelete= {deleteTask}/> : <h3 style={{color:"green"}}>You are on top of your tasks!</h3>}
        </>
      )}/>
      <Route path= "/about" component= {About}/>
      <Footer/>
    </div>
    </Router>
  );
}





export default App;


