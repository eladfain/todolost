
import './App.css';
import TodoLayout from "./components/TodoLayout";
import { useState, useEffect } from 'react';
import { url, key } from "./constants/connection";
import { genarateTasks } from "./interface/taskInterface";

function App() {
  const [tasks, setTasks] = useState([])
  const addTask = task => {
    setTasks(tasks => {
      return [...tasks, task]
    })

    const body = JSON.stringify({
      "records": [{
        'fields': {
          Status: task.isDone ? 'Done' : 'Todo',
          Tags: JSON.stringify(task.tags),
          Text: task.name
        }
      }]
    })
    fetch(url, {
      method: "POST",
      headers: { 'X-API-KEY': key },
      body: body,
    })
  }
  const removeTask = id => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
    const deleteUrl = url + "?records[]=" + id;
    fetch(deleteUrl, { method: "DELETE", headers: { 'X-API-KEY': key } })
  }
  const toggeleDone = id => {
    const task = tasks.find(task => task.id === id)

    const body = JSON.stringify({
      "records": [{
        'id': id,
        'fields': {
          Status: !task.isDone ? 'Done' : 'Todo',
        }
      }]
    })
    fetch(url, {
      method: 'PATCH',
      headers: { 'X-API-KEY': key },
      body: body
    })
    setTasks(tasks => tasks.map(task => task.id === id ?
      { ...task, isDone: !task.isDone }
      : { ...task }))
  }
  useEffect(() => {
    fetch(url, { headers: { 'X-API-KEY': key } }).then(res => res.json()).then(data => {
      setTasks(data.records.map(entry => genarateTasks(entry.fields, entry.id)))
    })
  }, [])
  const addTag = (id, tag) => {
    const task = tasks.find(task => task.id === id);
    const body = JSON.stringify({
      "records": [{
        'id': id,
        'fields': {
          Tags: JSON.stringify([...task.tags, tag]),
        }
      }]
    })
    fetch(url, {
      method: 'PATCH',
      headers: { 'X-API-KEY': key },
      body: body
    })
    setTasks(tasks => tasks.map(task => task.id === id ?
      { ...task, tags: [...task.tags, tag]}
      : { ...task }))
  }
  return (
    <div className="App">
      <TodoLayout tasks={tasks} addTag={addTag} addTask={addTask} removeTask={removeTask} toggeleDone={toggeleDone} />
    </div>
  );
}

export default App;
