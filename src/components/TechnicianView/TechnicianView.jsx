import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function TechnicianView() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const postTechnicianStatus = (number, message) => {
        console.log('in postTechnicianStatus');
        axios.post(`/api/message/${user.id}`, { status_number: number, details: message })
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
            <div onClick={() => postTechnicianStatus(1, 'Open for work!')} className="statusItem green">Status 1 - Open for work!</div>
            <div onClick={() => postTechnicianStatus(2, 'On break!')} className="statusItem yellow">Status 2 - On break!</div>
            <div onClick={() => postTechnicianStatus(3, 'Working')} className="statusItem red">Status 3 - Working</div>
        </div>
    );
};

// this allows us to use <App /> in index.js
export default TechnicianView;