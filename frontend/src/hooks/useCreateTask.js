import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const useCreateTask = () => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const createTask = async (title) => {
    if (!title || title.length === 0) {
      toast.error("Task can't be empty");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/tasks/create-task/${authUser._id}`,
        { title },
        { headers: { 'Content-Type': 'application/json' } }
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
      toast.success('Task created successfully');
    } catch (error) {
      toast.error("task is not created");
    } finally {
      setLoading(false);
    }
  };

  return { loading, createTask };
};

export default useCreateTask;
