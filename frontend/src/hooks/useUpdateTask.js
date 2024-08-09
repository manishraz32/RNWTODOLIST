import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { useTasksContext } from '../context/ResetTasksContext';

const useUpdateTask = () => {
  const { authUser } = useAuthContext();
  const {taskStatus, setTaskStatus} = useTasksContext();
  const [loading, setLoading] = useState(false);

  const updateTask = async (field, value, taskId) => {
    if (!value || value.length === 0) {
      toast.error(`${value} can't be empty`);
      return;
    }
    const bodyData = {};
    if(field == "title") {
        bodyData.title = value;
    } else if(field == "status") {
        bodyData.status = value;
    }
    setLoading(true);
    try {
      const response = await axios.put(
        `/api/tasks/update-task/${taskId}`,
        {...bodyData},
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = response.data;
     

    //   if (data.success) {
    //     throw new Error(data.message);
    //   }
      console.log(data.data);
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error("Task updation failed");
    } finally {
      setLoading(false);
      setTaskStatus(!taskStatus);
    }
  };

  return { loading, updateTask };
};

export default useUpdateTask;
