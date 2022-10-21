import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// MUI Imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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
            <h2>Welcome to the all users page, {user.username}!</h2>
            <Box sx={{ width: '75%', margin: 'auto' }}>
                <Stack spacing={2}>
                    {
                        allUsers.map(user => {

                            const Item = styled(Paper)(({ theme }) => ({
                                backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                ...theme.typography.body1,
                                padding: theme.spacing(1),
                                textAlign: 'center',
                                color: theme.palette.text.secondary,
                            }));

                            return (
                                <Item key={user.id}>{user.username}
                                    <br />{user.first_name} {user.last_name}
                                    <br />{user.classification}
                                    <br />{user.position}
                                    <br /><Button color="error" variant="outlined" onClick={() => deleteUser(user.id)}>Delete</Button>
                                </Item>
                            );
                        })
                    }
                </Stack>
            </Box>
        </div>
    );
};

// this allows us to use <App /> in index.js
export default AllUsersView;