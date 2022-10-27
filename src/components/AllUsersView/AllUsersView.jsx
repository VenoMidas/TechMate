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

function AllUsersView() {
    const user = useSelector((store) => store.user);
    const [allUsers, setAllUsers] = useState([])

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
                getAllUsers();
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong');
            });
    };

    return (
        <div className="container">
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
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={user.position === 'Technician' ? technicianAvatar : businessAvatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={user.first_name + ' ' + user.last_name} secondary={user.classification} />
                                    <Button color="error" variant="outlined" onClick={() => deleteUser(user.id)}>Delete</Button>
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