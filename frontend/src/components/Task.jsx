import React, { useState } from 'react'
import Chip from '@mui/material/Chip';
import { convertDateTime } from '../utils/convertDateTime';
import useUpdateTask from '../hooks/useUpdateTask';
import useDeleteTask from '../hooks/useDeleteTask';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useCreateTask from '../hooks/useCreateTask';
import { useTasksContext } from '../context/ResetTasksContext';


const Task = ({ status, taskId, title, createdAt }) => {
  const { loading, updateTask } = useUpdateTask();
  const { taskStatus, setTaskStatus } = useTasksContext();
  const { loading: taskDeleting, deleteTask } = useDeleteTask();
  const { loading: loadingCreateTask, createTask } = useCreateTask();
  

  const dateString = convertDateTime(createdAt)

  const handleMove = async (nextStatus) => {
    await updateTask("status", nextStatus, taskId);
  }

  const handleDeleteTaskClick = async () => {
    await deleteTask(taskId);
  }
  

  // handling updation of title
  const [open, setOpen] = useState(false);
  const [oldTitle, setOldTitle] = useState(title);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOkClick = async () => {
    await updateTask("title", oldTitle, taskId);
    setTaskStatus(!taskStatus);
    handleClose();
  }

  const handleClose = () => {
    setOldTitle("");
    setOpen(false);
  };


  return (
    <div className="p-3 flex flex-col gap-2 rounded-md w-full bg-[#E0E4EA] flex-shrink-0 shadow-md">
      <>
        <div 
          className="text-black font-semibold cursor-pointer" 
          onClick={handleClickOpen}
        >
          {title}
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Update Your Task Title"}
          </DialogTitle>
          <DialogContent>
            <TextField
              sx={{
                width: 500,
              }}
              id="outlined-multiline-flexible"
              value={oldTitle}
              onChange={(e) => {
                e.preventDefault();
                setOldTitle(e.target.value);
              }
              }
              multiline
              maxRows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOkClick} autoFocus>
              OK
            </Button>
            <Button onClick={handleClose}>CANCEL</Button>
          </DialogActions>
        </Dialog>
      </>
      <div className="text-xs"><span className="text-[#6C6C6C] text-xs font-semibold">Created At:</span> {dateString}</div>
      {status === "pending" && (
        <Chip
          label="move to in progress"
          color="primary"
          sx={{
            // Add custom styles here
            color: 'white',
            '&:hover': {
            },
            cursor: "pointer",
          }}
          onClick={() => handleMove("in-progress")}
        />
      )}

      {
        status === "in-progress" && (
          <>
            <Chip
              label="move to in pending"
              color="primary"
              sx={{
                // Add custom styles here
                color: 'white',
                '&:hover': {
                },
                cursor: "pointer",
              }}
              onClick={() => handleMove("pending")}
            />
            <Chip
              label="move to in completed"
              color="primary"
              sx={{
                // Add custom styles here
                color: 'white',
                '&:hover': {
                },
                cursor: "pointer",
              }}
              onClick={() => handleMove("completed")}
            />
          </>


        )
      }
      <Chip
        label="delete task"
        color="primary"
        sx={{
          // Add custom styles here
          backgroundColor: "#bb2124",
          color: 'white',
          '&:hover': {
            backgroundColor: "#bb2124",
          },
          cursor: "pointer",
        }}
        onClick={handleDeleteTaskClick}
      />
      {/* <Chip 
            label="move to in progress"    
            color="primary"
            className="cursor-pointer" 
            
        /> */}
    </div>
  )
}

export default Task