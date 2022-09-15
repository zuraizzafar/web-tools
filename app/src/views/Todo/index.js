import * as React from "react";
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function About() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [tasks, setTasks] = React.useState([]);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    React.useEffect(() => {
        console.log(tasks)
    }, [tasks])
    return (
        <div className="py">
            <Container>
                <Button onClick={handleToggle} variant="contained" startIcon={<AddCircleIcon />}>
                    Add Task
                </Button>

                <div className="py">
                    <Grid container spacing={2}>
                        {tasks.map((task, index) => {
                            let f_date = new Date(task.date)
                            return (
                                <Grid key={task.date} item xs={3}>
                                    <Card sx={{ minWidth: 275, height:'100%' }} elevation={4}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {f_date.toLocaleDateString()}
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                {task.name}
                                            </Typography>
                                            <Typography variant="body2">
                                                {task.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            {task.done ? <Chip label="Completed" color="success" variant="outlined" /> :
                                                <Button variant="outlined" size="small"
                                                    onClick={() => {
                                                        let _tasks = tasks;
                                                        let updated_tasks = _tasks.map((item, ind, _arr) => {
                                                            if (item.date === task.date) {
                                                                return {
                                                                    name: item.name,
                                                                    description: item.description,
                                                                    date: item.date,
                                                                    done: true
                                                                }
                                                            }
                                                            return item;
                                                        })
                                                        setTasks(updated_tasks);
                                                    }}
                                                >
                                                    Mark Done
                                                </Button>}
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box sx={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}>
                            <TextField sx={{ marginBottom: 2 }} fullWidth id="task-name" label="Task Name" variant="filled" value={name} onChange={val => setName(val.target.value)} />
                            <TextField sx={{ marginBottom: 2 }} fullWidth id="task-details" label="Task Details" variant="outlined" value={description} multiline rows={4} onChange={val => setDescription(val.target.value)} />
                            <Button
                                variant="contained"
                                startIcon={<AddCircleIcon />}
                                onClick={() => {
                                    setOpen(false);
                                    let date = new Date();
                                    setTasks(tasks => [
                                        ...tasks,
                                        {
                                            name: name,
                                            description: description,
                                            date: Date.parse(date),
                                            done: false
                                        }
                                    ])
                                    setName("")
                                    setDescription("")
                                }}
                            >
                                Add Task
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Container >
        </div >
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 12,
    p: 4,
    borderRadius: 2
}