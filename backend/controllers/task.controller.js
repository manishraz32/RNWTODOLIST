import Task from '../models/task.model.js';
import User from '../models/user.model.js';

export const createTask = async (req, res) => {
    try {
        const { userId } = req.params;
        const { title } = req.body;

        if (!title || !userId) {
            return res.status(400).json({
                success: false, 
                message: "title and userId required" 
            });
        }

        const task = new Task({
            title: title,
            user: userId,
        })

        await task.save();
        console.log("Task created successfully");
        
        // Add the task to the user's tasks array
        await User.findByIdAndUpdate(
            userId,
            { $push: { tasks: task._id } },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "task created successfully",
            data: {
                _id: task._id,
                title: task.title,
                status: task.status
            }
        });

    } catch (error) {
        console.log("Error in create Task controller: ", error.message);
        return res.status(500).json({
            success: false, 
            message: "Internal server error" 
        });
    }

}

export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, status } = req.body;

    try {
        // Create an update object with only the fields provided
        const updateFields = {};

        if (title !== undefined) {
            updateFields.title = title;
        }

        if (status !== undefined) {
            updateFields.status = status;
        }

        // Ensure that at least one field is being updated
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                success: false, 
                message: 'No fields to update' 
            });
        }

        // Find the task by ID and update it
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false, 
                message: 'Task not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: updatedTask,
        });
    } catch (error) {
        console.error('Error in updating task:', error);
        res.status(500).json({
            success: false, 
            message: 'Internal server error' 
        });
    }
}


export const deleteTask = async (req, res) => {
    const { userId } = req.params;
    const { taskId } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({
                success: false, 
                message: 'Task not found' 
            });
        }
        

        // Removed task from users
        await User.findByIdAndUpdate(
            userId, 
            { $pull: { tasks: taskId } },
            { new: true }
          );

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: deletedTask,
        });
    } catch (error) {
        console.error('Error in deleting task:', error);
        res.status(500).json({
            success: false, 
            message: 'Internal server error' 
        });
    }
}

