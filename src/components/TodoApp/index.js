// eslint-disable-next-line
import React, {useState} from 'react'
// eslint-disable-next-line
import './index.css'

const TodoApp = () => {
  const [tasks, setTasks] = useState([])
  const [taskCounts, setTaskCounts] = useState({})

  const addTask = () => {
    const taskInput = document.getElementById('new-task')
    const taskText = taskInput.value.trim()

    if (taskText !== '') {
      const taskArray = taskText.split(' ')
      const taskName = taskArray.slice(0, -1).join(' ')
      const quantity = parseInt(taskArray.slice(-1)[0]) || 1

      const newTasks = Array.from({length: quantity}, (_, index) => ({
        id: tasks.length + index + 1,
        name: `${taskName} - ${index + 1}`,
      }))

      setTasks(prevTasks => [...prevTasks, ...newTasks])

      setTaskCounts(prevCounts => {
        const updatedCounts = {...prevCounts}
        newTasks.forEach(task => {
          updatedCounts[task.name] = (prevCounts[task.name] || 0) + 1
        })
        return updatedCounts
      })

      taskInput.value = ''
    }
  }

  const deleteTask = (taskId, taskName) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))

    setTaskCounts(prevCounts => {
      const updatedCounts = {...prevCounts}
      updatedCounts[taskName] = (updatedCounts[taskName] || 0) - 1 // Refactored this line
      if (updatedCounts[taskName] === 0) {
        delete updatedCounts[taskName]
      }
      return updatedCounts
    })
  }
  // eslint-disable-next-line
  const editTask = taskId => {
    console.log(`Editing task with ID: ${taskId}`)
  }

  const updateTask = index => {
    const newTasks = [...tasks]
    const taskToUpdate = newTasks[index]
    newTasks[index] = {
      ...taskToUpdate,
      name: `${taskToUpdate.name} (Updated ${
        taskCounts[taskToUpdate.name] || 0
      } Times)`,
    }

    setTasks(newTasks)

    setTaskCounts(prevCounts => ({
      ...prevCounts,
      [taskToUpdate.name]: (prevCounts[taskToUpdate.name] || 0) + 1,
    }))
  }

  return (
    <div className="app">
      <h1>Todo App</h1>

      <div className="input-container">
        <input
          type="text"
          className="input-text"
          id="new-task"
          placeholder="Add a new task"
        />
        <button type="button" className="add-button" onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={task.id} className="task">
            <span>{task.name}</span>
            {/* <span className="task-count">{taskCounts[task.name]}</span> */}
            <div className="icons">
              <span
                className="update-icon"
                onClick={() => updateTask(index)}
                role="button"
                tabIndex={0}
              >
                ✏️
              </span>
              <span
                className="delete-icon"
                onClick={() => deleteTask(task.id, task.name)}
                role="button"
                tabIndex={0}
              >
                ❌
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoApp
