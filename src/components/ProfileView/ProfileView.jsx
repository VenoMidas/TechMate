import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function ProfileView() {
    const user = useSelector((store) => store.user);
    return (
        <div className="container">
            <h2>Welcome to the profile page, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <p>Your position is: {user.position}</p>
            <p>Your first name is: {user.first_name}</p>
            <p>Your first name is: {user.last_name}</p>
            inputs to PUT /api/user here
        </div>
    );
};

// this allows us to use <App /> in index.js
export default ProfileView;