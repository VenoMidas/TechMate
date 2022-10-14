import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function DispatchView() {
    const user = useSelector((store) => store.user);
    return (
        <div className="container">
            <h2>Welcome to the dispatch page, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <p>Your position is: {user.position}</p>
            <LogOutButton className="btn" />
        </div>
    );
};

// this allows us to use <App /> in index.js
export default DispatchView;