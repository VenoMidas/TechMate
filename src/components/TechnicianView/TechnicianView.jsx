import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// MUI imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import technicianAvatar from '../../images/technician.jpg'

function TechnicianView({ socket }) {
    const user = useSelector((store) => store.user);
    const status = useSelector((store) => store.status)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_STATUS', payload: user.id });
    }, []);

    const postTechnicianStatus = (number, message) => {
        console.log('in postTechnicianStatus');
        axios.post(`/api/message/${user.id}`, { status_number: number, details: message })
            .then(() => {
                dispatch({ type: 'FETCH_STATUS', payload: user.id });
                socket.emit('update dispatch', 'update');
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong!');
            });
    };

    const ItemOne = styled(Paper)(({ theme }) => ({
        // backgroundColor: status.status_number === 1 ? '#00AE00' : '#fff',
        // ...theme.typography.body1,
        backgroundImage: status.status_number === 1 ? 'radial-gradient(#fff 40%, #00AE00)' : '#fff',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        fontWeight: status.status_number === 1 ? 'bold' : 'normal',
        border: '1px solid #00AE00',
        cursor: 'pointer',
        padding: '20px'
    }));
    const ItemTwo = styled(Paper)(({ theme }) => ({
        // backgroundColor: status.status_number === 2 ? '#D6Af00' : '#fff',
        // ...theme.typography.body1,
        backgroundImage: status.status_number === 2 ? 'radial-gradient(#fff 40%, #D6Af00)' : '#fff',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        fontWeight: status.status_number === 2 ? 'bold' : 'normal',
        border: '1px solid #D6Af00',
        cursor: 'pointer',
        padding: '20px'
    }));
    const ItemThree = styled(Paper)(({ theme }) => ({
        // backgroundColor: status.status_number === 3 ? '#FF6161' : '#fff',
        // ...theme.typography.body1,
        backgroundImage: status.status_number === 3 ? 'radial-gradient(#fff 40%, #FF6161)' : '#fff',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        fontWeight: status.status_number === 3 ? 'bold' : 'normal',
        border: '1px solid #FF6161',
        cursor: 'pointer',
        padding: '20px',
    }));

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
                        <Avatar src={technicianAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary={user.first_name + ' ' + user.last_name} secondary="Status" />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>

            <Box sx={{ width: '50%', margin: 'auto' }}>
                <Stack spacing={2}>
                    <ItemOne onClick={() => postTechnicianStatus(1, 'Open for work!')} >Open for work!</ItemOne>
                    <ItemTwo onClick={() => postTechnicianStatus(2, 'On break!')} >On Break!</ItemTwo>
                    <ItemThree onClick={() => postTechnicianStatus(3, 'Working!')} >Working!</ItemThree>
                </Stack>
            </Box>

        </div>
    );
};

export default TechnicianView;