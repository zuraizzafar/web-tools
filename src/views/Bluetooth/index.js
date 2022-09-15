import * as React from "react";
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import { green, red } from '@mui/material/colors';
import Snackbar from '@mui/material/Snackbar';

export default function CheckBlue() {
    const [experimental, setExperimental] = React.useState(true);
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
        const checkConn = () => {
            try {
                if (navigator.bluetooth === undefined) {
                    setExperimental(false)
                    setConnected(false)
                    setLoading(false)
                }
                navigator.bluetooth.getAvailability().then((available) => {
                    if (available) {
                        setConnected(true)
                        setLoading(false)
                    } else {
                        setConnected(false)
                        setLoading(false)
                    }
                });
                navigator.bluetooth.addEventListener("availabilitychanged", (event) => {
                    const availability = event.value;
                    if (availability) {
                        setConnected(true)
                        setLoading(false)
                    } else {
                        setConnected(false)
                        setLoading(false)
                    }
                });
            } catch (err) {
                console.error(err)
            }
        }
        checkConn();
    }, [])
    return (
        <>
            <LinearProgress variant={loading ? "indeterminate" : "determinate"} value={loading ? 0 : 100} />
            <div className="py">
                <Container sx={{ textAlign: 'center' }}>
                    <h4> {(loading) ? "Checking Bluetooth availability" : (connected) ? "Bluetooth available on device" : (experimental) ? "Bluetooth not available" : "Experimental features are not available on your device"} </h4>
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
                    {(experimental) ? <></> : <div>
                        <p>
                            Enable Experimental features by visiting:
                        </p>
                        <Chip label="about://flags" variant="outlined" />
                    </div>}
                </Container>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    message={"Bluetooth " + (connected ? "Connected" : "Disconnected")}
                />
            </div>
        </>
    );
}