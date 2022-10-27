import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// MUI Imports
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
import businessAvatar from '../../images/dealership.jpg'

function DispatchView({ socket }) {
    const user = useSelector((store) => store.user);
    const techStatus = useSelector((store) => store.techStatus)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_TECH_STATUS' });
    }, []);

    socket.on('update', () => {
        dispatch({ type: 'FETCH_TECH_STATUS' });
    });

    const updateTechStatus = (id, number, message) => {
        // console.log('In dispatch updateTechStatus', id);
        axios.post(`/api/message/${id}`, { status_number: number, details: message })
            .then(() => {
                dispatch({ type: 'FETCH_TECH_STATUS' });
                socket.emit('update technician', 'update tech');
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong!');
            });
    };

    const checkStatusNumberGradient = (techStatus) => {
        switch (techStatus) {
            case 1:
                return 'linear-gradient(to bottom right, rgba(0,174,0,1), rgba(0,174,0,0))';
            case 2:
                return 'linear-gradient(to bottom right, rgba(214,175,0,1), rgba(214,175,0,0))';
            case 3:
                return 'linear-gradient(to bottom right, rgba(255,97,97,1), rgba(255,97,97,0))';
            case 4:
                return 'linear-gradient(to bottom right, rgba(152,152,210,1), rgba(152,152,210,0))';
            case 5:
                return 'linear-gradient(to bottom right, rgba(187,187,187,1), rgba(187,187,187,0))';
            default:
                return 'linear-gradient(to bottom right, rgba(255,0,0,1), rgba(255,0,0,1))';
        };
    };

    return (
        <div className="container">
            <List
                sx={{
                    width: '60%',
                    bgcolor: '#eee',
                    margin: '20px auto',
                }}
            >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={businessAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary="Farhampton Motors" secondary="Dispatch" />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>

            <Box sx={{ width: '70%', margin: 'auto' }}>
                <Stack spacing={2}>
                    {
                        techStatus.map(tech => {

                            const Item = styled(Paper)(({ theme }) => ({
                                backgroundImage: checkStatusNumberGradient(tech.status_number),
                                ...theme.typography.body1,
                                padding: theme.spacing(1),
                                textAlign: 'left',
                                color: '#000',
                                cursor: 'pointer',
                            }));

                            return (
                                <Item key={tech.id} onClick={() => updateTechStatus(tech.user_id, 4, 'Work dispatched!')} > <strong>{tech.first_name} {tech.last_name}</strong> - {tech.classification}<br />{tech.details} </Item>
                            )
                        })
                    }
                </Stack>
            </Box>
        </div>
    );
};

// this allows us to use <App /> in index.js
export default DispatchView;