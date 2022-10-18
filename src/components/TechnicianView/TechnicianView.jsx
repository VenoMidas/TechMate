import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function TechnicianView() {
    const user = useSelector((store) => store.user);
    return (
        <div className="container">
            <h2>Welcome to the technician page, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <p>Your position is: {user.position}</p>
            <div className="statusItem green">Status 1</div>
            <div className="statusItem yellow">Status 2</div>
            <div className="statusItem red">Status 3</div>
        </div>
    );
};

// this allows us to use <App /> in index.js
export default TechnicianView;