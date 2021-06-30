import { useEffect, useState } from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
// import {fetchTask,fetchTasks} from './utils/api';
import api from './api/tasks';
import './App.css';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks,setTasks] = useState([]);

  const retrieveTasks = async() => {
    const response = await api.get("tasks");
    return response.data;
  }


  useEffect(() => {
    const getAllTasks = async () => {
      const allTasks = await retrieveTasks();
      if(allTasks) setTasks(allTasks);
    }
    getAllTasks();
    
  },[])

const onAdd = () => { setShowAddTask(!showAddTask) }

// Add Task
const addTask = async (task) => {
  const response = await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers:{'Content-type':'application/json'},
    body:JSON.stringify(task)
  })

  const newTask = await response.json();console.log(newTask)
  setTasks([...tasks,newTask]);
  
  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task}
  // setTasks([...tasks, newTask])
}

// Edit Task
const editTask = async(id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,{ method:'PUT' })
  console.log(tasks.map(task => task.id === id))
}

// Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,{ method:'DELETE' })
  setTasks(tasks.filter(task => task.id !== id))
}

// toggle Reminder
const toggleReminder = (id) => {
  setTasks(tasks.map(task => task.id === id ? { ...task,reminder:!task.reminder } : task))
}

  return (
    <div className="container">
      <Header onAdd={onAdd} showAddTask={showAddTask} />
      { showAddTask && <AddTask onAdd={addTask} /> }
      { tasks.length > 0 ? 
        <Tasks tasks={tasks} onEdit={editTask} onDelete={deleteTask} onToggle={toggleReminder} /> : 
        'No Task To Show' }
    </div>
  );
}

export default App;
