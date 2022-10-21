import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// MUI Imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

function DispatchView() {
    const user = useSelector((store) => store.user);
    const techStatus = useSelector((store) => store.techStatus)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_TECH_STATUS' });
    }, []);

    const checkStatusNumber = (techStatus) => {
        switch (techStatus) {
            case 1:
                return 'green';
            case 2:
                return 'goldenrod';
            case 3:
                return 'red';
            default:
                return '#fff';
        };
    };

    return (
        <div className="container">
            <h2>{user.username}, signed in as Dispatch</h2>
            <Box sx={{ width: '75%', margin: 'auto' }}>
                <Stack spacing={2}>
                    {
                        techStatus.map(tech => {

                            const Item = styled(Paper)(({ theme }) => ({
                                backgroundColor: checkStatusNumber(tech.status_number),
                                ...theme.typography.body1,
                                padding: theme.spacing(1),
                                textAlign: 'center',
                                color: theme.palette.text.secondary,
                            }));

                            return (
                                <Item key={tech.id} > {tech.first_name} {tech.last_name}<br />{tech.classification}<br />{tech.details} </Item>
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