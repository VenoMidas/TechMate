import React from 'react';
import { useSelector } from 'react-redux';

function AllUsersView() {
    const user = useSelector((store) => store.user);
    return (
        <div className="container">
            <h2>Welcome to the all users page, {user.username}!</h2>
            <p>Your position is: {user.position}</p>
            display all users here
        </div>
    );
};

// this allows us to use <App /> in index.js
export default AllUsersView;