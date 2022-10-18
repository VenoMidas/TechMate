import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function TechnicianView() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const postTechnicianStatus = () => {
        console.log('in postTechnicianStatus');
        let statusNumber = 1 // needs to be the status user clicked on
        let details = 'Open for work!' // the message of the status
        axios.post(`/api/message/${user.id}`, { status_number: statusNumber, details: details })
            .then(() => {
                dispatch({ type: '' }); // want to fetch a user update for status to display on screen or something with RETURNING status_number
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong!');
            });
    };

    return (
        <div className="container">
            <h2>Welcome to the technician page, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <p>Your position is: {user.position}</p>
            <div onClick={() => postTechnicianStatus()} className="statusItem green">Status 1 - Open for work!</div>
            <div onClick={() => postTechnicianStatus()} className="statusItem yellow">Status 2</div>
            <div onClick={() => postTechnicianStatus()} className="statusItem red">Status 3</div>
        </div>
    );
};

// this allows us to use <App /> in index.js
export default TechnicianView;