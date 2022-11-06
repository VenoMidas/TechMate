import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// MUI Imports
import Button from '@mui/material/Button';
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

function AllUsersView() {
    const user = useSelector((store) => store.user);
    const [allUsers, setAllUsers] = useState([])
    const [alertStatus, setAlertStatus] = useState(false);
    const [userToDelete, setUserToDelete] = useState(0);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        // console.log('In getAllUsers');
        axios.get('/api/user/all')
            .then((response) => {
                setAllUsers(response.data);
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong.')
            });
    };

    const deleteUser = (userId) => {
        console.log('In deleteUser');
        axios.delete(`/api/user/${userId}`)
            .then(() => {
                setAlertStatus(false);
                getAllUsers();
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong');
            });
    };

    const updateAlert = (userId) => {
        setUserToDelete(userId);
        setAlertStatus(true);
    };

    return (
        <div className="container">

            <Dialog
                open={alertStatus}
                onClose={() => setAlertStatus(false)}
            >
                <DialogTitle >
                    Are you sure you want to delete this user?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        This CANNOT be undone!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={() => deleteUser(userToDelete)} autoFocus>
                        DELETE
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
                        <Avatar src={businessAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary="Farhampton Motors" secondary="All Users" />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>

            <List
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    bgcolor: '#eee',
                    margin: '20px auto',
                }}
            >
                {
                    allUsers.map(user => {



                        return (
                            <>
                                <ListItem key={user.id}>
                                    <ListItemAvatar>
                                        <Avatar src={user.position === 'Technician' ? technicianAvatar : businessAvatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={user.first_name + ' ' + user.last_name} secondary={user.classification} />
                                    <Button color="error" variant="outlined" onClick={() => updateAlert(user.id)}>Delete</Button>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        )
                    })
                }
            </List>
        </div>
    );
};

// this allows us to use <App /> in index.js
export default AllUsersView;