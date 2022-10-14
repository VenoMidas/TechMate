import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function ProfileView() {
    const user = useSelector((store) => store.user);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [classification, setClassification] = useState(user.classification);

    const updateProfile = () => {
        console.log('In updateProfile');
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
                            required
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
                            required
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
                            required
                            onChange={(event) => setClassification(event.target.value)}
                        />
                    </label>
                </div>
            </form>
        </div>
    );
};

export default ProfileView;