import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useCreateTask from '../hooks/useCreateTask';
import { useTasksContext } from '../context/ResetTasksContext';


export default function AddTask() {
    const {taskStatus, setTaskStatus } = useTasksContext();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const { loading, createTask } = useCreateTask();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOkClick = async () => {
        await createTask(title);
        setTaskStatus(!taskStatus);
        handleClose();
    }

    const handleClose = () => {
        setTitle("");
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                + Add Task
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add Your Task"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{
                            width: 500,
                        }}
                        id="outlined-multiline-flexible"
                        value={title}
                        onChange={(e) => {
                            e.preventDefault();
                            setTitle(e.target.value);
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
    );
}