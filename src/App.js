//import React from 'react'
import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

const App = () => {
  // Making the state global here so all components can access this.
  // "States get passed down, actions get passed up."
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: 'Throw more money at vtubers',
      day: 'May 17th @ All Day',
      reminder: true
    },
    {
        id: 2,
        description: 'Watch more Lamy streams',
        day: 'May 18th @ All Day',
        reminder: true
    },
    {
        id: 3,
        description: 'Sleep some more',
        day: 'May 17th @ 3 pm',
        reminder: true
    }
  ])

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      // Go through each task, if it matches id
      // 1. Leave all properties the same, except change reminder
      // 2. Else just return task unchanged.
      tasks.map((task) => task.id === id ? 
      { ...task, reminder: !task.reminder } : task));
  }


  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="container">
      <Header title = "Task App"/>
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
