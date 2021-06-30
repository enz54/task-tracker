import Task from './Task'

const Tasks = ({ tasks,onEdit,onDelete,onToggle }) => {
 
    return(
        <div>
            {tasks.map(task => (
                <Task 
                    key={task.id} 
                    task={task} 
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </div>
    )
}

export default Tasks;