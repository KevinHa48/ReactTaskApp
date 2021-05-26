//import React from 'react'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  // Making the state global here so all components can access this.
  // "States get passed down, actions get passed up."
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    console.log(data);
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      // Go through each task, if it matches id
      // 1. Leave all properties the same, except change reminder
      // 2. Else just return task unchanged.
      tasks.map((task) => task.id === id ? 
      { ...task, reminder: !task.reminder } : task));
  }

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    //console.log(newTask);
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="container">
      <Header onAdd = {() => setShowAddTask(!showAddTask)}
      showAdd = {showAddTask}
      title = "Task App"
      />
      {showAddTask && <AddTask onAdd = {addTask}/>}
      {/* Ternary used to show if no more tasks are left. */}
      {tasks.length > 0 ? ( <Tasks tasks={tasks} 
      onDelete = {deleteTask}
      onToggle = {toggleReminder}/>
      ) : ('No tasks to show.') }
    </div>
  );
}

// Class implementation for react components...
// class App extends React.Component {
//   render() {
//     return (
//       <h1>Class implementation</h1>
//     )
//   }
// }

export default App;
