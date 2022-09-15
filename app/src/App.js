import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Todo from "./views/Todo";
import TopBar from "./components/topBar";
import CheckNet from "./views/CheckNet";
import CheckBlue from "./views/Bluetooth";
import SpeedDial from "./components/speedDial";
// import Navigation from "./navigation";
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsBluetoothIcon from '@mui/icons-material/SettingsBluetooth';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';

export default function App() {
  const menu = [
    { name: 'Todo', icon: <ListAltIcon />, link: '/' },
    { name: 'Check Internet', icon: <SignalWifiStatusbarConnectedNoInternet4Icon />, link: '/check' },
    { name: 'Check Bluetooth', icon: <SettingsBluetoothIcon />, link: '/bluetooth' },
  ]
  return (
    <div className="App">
      <TopBar menu={menu} />
      <div className="speed-dial">
        <SpeedDial actions={menu} />
      </div>
      <div className="bottom-navigation">
        {/* <Navigation menu={menu} /> */}
      </div>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/check" element={<CheckNet />} />
        <Route path="/bluetooth" element={<CheckBlue />} />
      </Routes>
    </div>
  );
}


