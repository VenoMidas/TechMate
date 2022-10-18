import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function TechnicianView() {
    const user = useSelector((store) => store.user);
    const status = useSelector((store) => store.status)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(status)
        dispatch({ type: 'FETCH_STATUS', payload: user.id });
        console.log(status)
    }, []);

    const postTechnicianStatus = (number, message) => {
        console.log('in postTechnicianStatus');
        axios.post(`/api/message/${user.id}`, { status_number: number, details: message })
            .then(() => {
                dispatch({ type: 'FETCH_STATUS', payload: user.id });
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong!');
            });
    };

    return (
        <div className="container">
            <h2>Welcome to the technician page, {user.username}!</h2>
            <p>Your status is: {status.details}</p>
            <p>Your position is: {user.position}</p>
            <div onClick={() => postTechnicianStatus(1, 'Open for work!')} className="statusItem green">Status 1 - Open for work!</div>
            <div onClick={() => postTechnicianStatus(2, 'On break!')} className="statusItem yellow">Status 2 - On break!</div>
            <div onClick={() => postTechnicianStatus(3, 'Working!')} className="statusItem red">Status 3 - Working</div>
        </div>
    );
};

export default TechnicianView;