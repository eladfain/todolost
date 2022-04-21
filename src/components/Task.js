import { useState } from "react";
import './Task.css'
const Task = props => {
    const [newTag, setNewTag] = useState('');
    const newTagChangeHandler = e => {
        setNewTag(e.target.value);
    }
    const addNewTagHandler = () => {
        props.addTag(newTag);
        setNewTag('');
    }
    const tags = props.task.tags.map((tag, index) => <span className="tag" key={index}>{tag}</span>)
    return (
        <div className="card">
            <div className="task">
                <input className="checkbox" onChange={props.toggle} type='checkbox' defaultChecked={props.task.isDone} />
                <span className="text">{props.task.name}</span>
                <button className="delete" onClick={props.remove}>delete</button>
            </div>

            <div>
                <input placeholder="tags" onChange={newTagChangeHandler} value={newTag} type='text' />
                <button onClick={addNewTagHandler}>+</button>
                <div>
                    {tags}
                </div>

            </div>
        </div>
    )
}

export default Task;