import React from 'react'
import Task from './Task'

const TaskContainer = ({ containerName, tasks }) => {
    console.log("taskContainer: ", tasks);
    return (
        <div className="p-4 flex flex-col gap-4 rounded-xl bg-[#F6F6F6] h-[500px] overflow-x-auto task-container">
            <div className="font-bold text-xl">{containerName}</div>
            {
                tasks.map(({_id, status, title, createdAt}) => (
                    <Task  
                        key={_id}
                        status={status}
                        taskId={_id}
                        title={title}
                        createdAt={createdAt} 
                    />
                ))
            }
        </div>
    )
}

export default TaskContainer