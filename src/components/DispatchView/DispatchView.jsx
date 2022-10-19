import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function DispatchView() {
    const user = useSelector((store) => store.user);
    const techStatus = useSelector((store) => store.techStatus)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_TECH_STATUS' });
    }, []);

    return (
        <div className="container">
            <h2>Welcome to the dispatch page, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <p>Your position is: {user.position}</p>
            {
                techStatus.map(tech => {
                    return (
                        <ul key={tech.id} >
                            <li>{tech.first_name}</li>
                            <li>{tech.last_name}</li>
                            <li>{tech.classification}</li>
                            <li>{tech.details}</li>
                        </ul>
                    )
                })
            }
        </div>
    );
};

// this allows us to use <App /> in index.js
export default DispatchView;