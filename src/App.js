//import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

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

    console.log(data)
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    console.log(data)
    return data
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      // Go through each task, if it matches id
      // 1. Leave all properties the same, except change reminder
      // 2. Else just return task unchanged.
      tasks.map((task) => task.id === id ? 
      { ...task, reminder: data.reminder } : task));
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    //console.log(newTask);
    const data = await res.json();
    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd = {() => setShowAddTask(!showAddTask)}
            showAdd = {showAddTask}
            title = "Task App"
            />

        <Route path = '/' exact render = {(props) => (
          <>
            {showAddTask && <AddTask onAdd = {addTask}/>}

            {/* Ternary used to show if no more tasks are left. */}

            {tasks.length > 0 ? ( <Tasks tasks={tasks} 
            onDelete = {deleteTask}
            onToggle = {toggleReminder}/>
            ) : ('No tasks to show.') }
          </>
        )} />
         
      <Route path = '/about' component = {About} />
      <Footer />

      </div>
    </Router>
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
