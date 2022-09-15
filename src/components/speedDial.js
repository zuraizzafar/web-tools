import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useNavigate } from "react-router-dom";
import DehazeIcon from '@mui/icons-material/Dehaze';

export default function BasicSpeedDial(props) {
    let navigate = useNavigate();
    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: 0, right: 0 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<DehazeIcon />}
            >
                {props.actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => {
                            navigate(action.link);
                        }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
