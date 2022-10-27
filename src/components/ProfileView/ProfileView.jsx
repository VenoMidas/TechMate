import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// MUI imports
import TextField from '@mui/material/TextField'; // import TextField element from MUI
import Button from '@mui/material/Button'; // import Button element from MUI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function ProfileView() {
    const user = useSelector((store) => store.user);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [classification, setClassification] = useState(user.classification);
    const dispatch = useDispatch();

    const updateProfile = (event) => {
        event.preventDefault();
        console.log('In updateProfile');
        axios.put(`/api/user/${user.id}`, { first_name: firstName, last_name: lastName, classification: classification })
            .then(() => {
                dispatch({ type: 'FETCH_USER' });
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong!');
            });
    };

    return (
        <div className="container">

            <h1>Profile</h1>

            <Box sx={{ width: '35%', margin: 'auto' }}>
                <Card>
                    <CardContent>
                        <form onSubmit={updateProfile}>

                            <TextField fullWidth label="First Name:" value={firstName} onChange={(event) => setFirstName(event.target.value)} variant="standard" margin="dense" />
                            <br />
                            <TextField fullWidth label="Last Name:" value={lastName} onChange={(event) => setLastName(event.target.value)} variant="standard" margin="dense" />
                            <br />
                            <TextField fullWidth label="Classification:" value={classification} onChange={(event) => setClassification(event.target.value)} variant="standard" margin="dense" />
                            <br />
                            <br />
                            <Button color="success" variant="contained" type='submit'>Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>

        </div>
    );
};

export default ProfileView;