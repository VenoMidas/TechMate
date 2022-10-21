import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// MUI imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

function TechnicianView() {
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
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong!');
            });
    };

    const ItemOne = styled(Paper)(({ theme }) => ({
        backgroundColor: status.status_number === 1 ? 'green' : '#fff',
        ...theme.typography.body1,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const ItemTwo = styled(Paper)(({ theme }) => ({
        backgroundColor: status.status_number === 2 ? 'goldenrod' : '#fff',
        ...theme.typography.body1,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const ItemThree = styled(Paper)(({ theme }) => ({
        backgroundColor: status.status_number === 3 ? 'red' : '#fff',
        ...theme.typography.body1,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div className="container">

            <h2>{user.username}, update your status below</h2>

            <Box sx={{ width: '75%', margin: 'auto' }}>
                <Stack spacing={2}>
                    <ItemOne onClick={() => postTechnicianStatus(1, 'Open for work!')} className='green' >Open for work!</ItemOne>
                    <ItemTwo onClick={() => postTechnicianStatus(2, 'On break!')} className='yellow' >On Break!</ItemTwo>
                    <ItemThree onClick={() => postTechnicianStatus(3, 'Working!')} className='red' >Working!</ItemThree>
                </Stack>
            </Box>

        </div>
    );
};

export default TechnicianView;