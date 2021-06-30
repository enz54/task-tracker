import { FaRegEdit,FaRegTrashAlt } from 'react-icons/fa';

const Task = ({ task,onEdit,onDelete,onToggle}) => {
    return(
        <div 
            className={ `task  ${task.reminder?'reminder' : ''}` }
            onDoubleClick={ () => onToggle(task.id) }
        >
            <h3>
                <div>{task.text}</div>
                <div>
                    <FaRegEdit 
                        style={{color:'blue'}}
                        onClick={() => onEdit(task.id)}
                    />{' '}
                    <FaRegTrashAlt 
                        style={ {color:'#d11'} } 
                        onClick={ () => onDelete(task.id) }
                    />
                </div>
            </h3>
            <div>{task.day}</div>
        </div>
    )
}

export default Task;