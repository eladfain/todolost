import { useState } from "react";
import taskInterface from "../interface/taskInterface";
import Task from './Task';
import './TodoLayout.css';
const TodoLayout=props=>{
    const {tasks,addTask}=props;
    const [newTask,setNewTask]=useState('');
    const [filter,setFilter] = useState('');
    const newTaskChangeHAndler=(e)=>{
         setNewTask(e.target.value); 
    }
    const enterListerner=(e)=>{
        if(e.keyCode===13){
            addTask(taskInterface(newTask))
            setNewTask('')
        }
    }
    const filetrHandler=(e)=>{
        setFilter(e.target.value);
    }
    
    const tasksTodisplay=tasks.filter(task=>
        task.tags.find(tag=>tag.indexOf(filter)>-1) ||
        task.name.indexOf(filter)>-1
    )
    .map(task=><Task addTag={props.addTag.bind(null,task.id)} key={task.id} toggle={props.toggeleDone.bind(null,task.id)} remove={props.removeTask.bind(null,task.id)} task={task}/>)
    return(
        <div>
            <input onChange={filetrHandler} placeholder="Filter by tags or name"></input>
           
                <div className="flex">
                    {tasksTodisplay}
                </div>
            <input onKeyDown={enterListerner} onChange={newTaskChangeHAndler} value={newTask} placeholder="Add new task, enter to store"></input>
        </div> 
    )
}

export default TodoLayout;