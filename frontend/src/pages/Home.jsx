import React, { useEffect, useState} from 'react'
import AddTask from '../components/AddTask'
import TaskContainer from '../components/TaskContainer'
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTasksContext } from '../context/ResetTasksContext';
import useLogout from '../hooks/useLogout';
import toast from 'react-hot-toast'

const Home = () => {
  const { authUser } = useAuthContext();
  const {taskStatus, setTaskStatus } = useTasksContext();
  const { logout } = useLogout();
  const [tasks, setTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  console.log("authUser", authUser);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const response = await axios.get(`api/user/get-user-and-tasks/${authUser._id}`);
        const data = response.data;
        if(!data.success) {
          throw new Error(data.message);
        }
        setTasks(data.data?.tasks); 
      } catch {
        toast.error("task not fetched");
      }
    }
    getAllTasks();
  }, [taskStatus, authUser]);
  
  useEffect(() => {
    const pending = tasks.filter((task) => task.status == "pending");
    const inProgress = tasks.filter((task) => task.status == "in-progress");
    const completed = tasks.filter((task) => task.status == "completed");

    setPendingTasks(pending);
    setInProgressTasks(inProgress);
    setCompletedTasks(completed);
  }, [tasks]);
  console.log("tasks", tasks);
  console.log("pending: ", pendingTasks);
  return (
    <div className="flex flex-col p-4 w-full gap-[20px]">
        <div className="w-full flex justify-between">
            <div className="flex gap-4 items-center">
              <div className="text-xl font-bold text-black"> {authUser?.fullName} </div>
              <div 
                className="cursor-pointer"
                onClick={() => logout()}
              >
                 <LogoutIcon />
               </div>
            </div>
            <AddTask />
        </div>
        <div className="flex gap-5 justify-center main-container">
            <TaskContainer
              containerName="Pending"
              tasks={pendingTasks} 
            />
            <TaskContainer 
              containerName="In-Progress"
              tasks={inProgressTasks}
            />
            <TaskContainer
              containerName="Completed"
              tasks={completedTasks} 
            />
        </div>
    </div>
  )
}

export default Home