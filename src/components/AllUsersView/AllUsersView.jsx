import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function AllUsersView() {
    const user = useSelector((store) => store.user);
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        // getAllUsers();
    }, []);

    const getAllUsers = () => {
        console.log('In getAllUsers');
        axios.get('/api/user/all')
            .then((response) => {
                setAllUsers(response.data);
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong.')
            });
    };

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