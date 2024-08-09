import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { useTasksContext } from '../context/ResetTasksContext';

const useDeleteTask = () => {
  const { authUser } = useAuthContext();
  const {taskStatus, setTaskStatus} = useTasksContext();
  const [loading, setLoading] = useState(false);

  const deleteTask = async (taskId) => {
    
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/tasks/delete-task/${authUser._id}/${taskId}`,
      );

      const { data } = response.data;
      // Log specific properties to avoid circular reference issues
    //   console.log('Task creation response', {
    //     success: data.success,
    //     taskId: data.task?._id,
    //     message: data.message,
    //   });

      if (data.success) {
        throw new Error(data.message);
      }
      console.log(data.data);
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error("task is not delted successfully");
    } finally {
      setLoading(false);
      setTaskStatus(!taskStatus);
    }
  };

  return { loading, deleteTask };
};

export default useDeleteTask;
