import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// MUI imports
import TextField from '@mui/material/TextField'; // import TextField element from MUI
import Button from '@mui/material/Button'; // import Button element from MUI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import technicianAvatar from '../../images/technician.jpg'
import businessAvatar from '../../images/dealership.jpg'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ProfileView() {
    const user = useSelector((store) => store.user);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [classification, setClassification] = useState(user.classification);
    const [alertStatus, setAlertStatus] = useState(false);
    const history = useHistory();

    const updateProfile = (event) => {
        event.preventDefault();
        console.log('In updateProfile');
        axios.put(`/api/user/${user.id}`, { first_name: firstName, last_name: lastName, classification: classification })
            .then(() => {
                // history.push('/home');
                setAlertStatus(true);
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong!');
            });
    };

    return (
        <div className="container">

            <Dialog
                open={alertStatus}
                onClose={() => history.push('/home')}
            >
                <DialogTitle >
                    Your profile has been updated!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Close this window to return home.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" onClick={() => history.push('/home')} autoFocus>
                        Home
                    </Button>
                </DialogActions>
            </Dialog>

            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: '#eee',
                    margin: '20px auto',
                }}
            >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={user.position === 'Technician' ? technicianAvatar : businessAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary={user.first_name + ' ' + user.last_name} secondary="Profile" />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>

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