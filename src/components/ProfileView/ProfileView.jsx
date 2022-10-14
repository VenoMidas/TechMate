import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function ProfileView() {
    const user = useSelector((store) => store.user);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [classification, setClassification] = useState(user.classification);
    const dispatch = useDispatch();

    const updateProfile = (event, userId) => {
        event.preventDefault();
        console.log('In updateProfile');
        axios.put(`/api/user/${userId}`, { first_name: firstName, last_name: lastName, classification: classification })
            .then(() => {
                dispatch({ type: 'FETCH_USER' });
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong!');
            });
    };

    return (
        <div className="container">
            <h2>Welcome to the profile page, {user.username}!</h2>
            <p>Position: {user.position}</p>
            <form onSubmit={updateProfile}>
                <div>
                    <label htmlFor="first_name">
                        First Name:
                        <input
                            type="text"
                            name="first_name"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="last_name">
                        Last Name:
                        <input
                            type="text"
                            name="last_name"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="classification">
                        Classification:
                        <input
                            type="text"
                            name="classification"
                            value={classification}
                            onChange={(event) => setClassification(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
};

export default ProfileView;