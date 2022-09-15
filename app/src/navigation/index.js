import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation(props) {
    const [value, setValue] = React.useState(0);
    let navigate = useNavigate();
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        navigate(props.menu[newValue].link);
                        setValue(newValue);
                    }}
                >
                    {props.menu.map((item, index) => (
                        <BottomNavigationAction key={index} label={item.name} icon={item.icon} to={item.link} />
                    ))}
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
