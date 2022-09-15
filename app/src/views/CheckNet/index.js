import * as React from "react";
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import { green, red } from '@mui/material/colors';
import Snackbar from '@mui/material/Snackbar';

export default function CheckNet() {
    const [loading, setLoading] = React.useState(true);
    const [connected, setConnected] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    React.useEffect(() => {
        const checkNet = () => {
            let prevConn = connected;
            fetch('https://fakestoreapi.com/products/1')
                .then(function () {
                    setLoading(false)
                    setConnected(true)
                })
                .catch(function () {
                    setLoading(false)
                    setConnected(false)
                })
            if (connected !== prevConn) setOpen(true)
        }
        setInterval(() => {
            checkNet();
        }, 5000)
    }, [connected])
    return (
        <>
            <LinearProgress variant={loading ? "indeterminate" : "determinate"} value={loading ? 0 : 100} />
            <div className="py">
                <Container sx={{ textAlign: 'center' }}>
                    <h4> {(loading) ? "Checking Internet Conectivity" : (connected) ? "Internet Connected" : "Internet Disconnected"} </h4>
                    {(loading) ? <CircularProgress size={70} variant={loading ? "indeterminate" : "determinate"} value={loading ? 0 : 100} /> : <></>}
                    {(loading) ? <></> : (connected) ? <Fab
                        sx={{ backgroundColor: green[500], color: '#fff' }}
                    >
                        <CheckIcon />
                    </Fab> : <Fab
                        sx={{ backgroundColor: red[500], color: '#fff' }}
                    >
                        <CloseIcon />
                    </Fab>}
                </Container>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    message={"Internet " + (connected ? "Connected" : "Disconnected")}
                />
            </div>
        </>
    );
}