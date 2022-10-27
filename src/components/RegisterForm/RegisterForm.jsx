import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// MUI imports
import TextField from '@mui/material/TextField'; // import TextField element from MUI
import Button from '@mui/material/Button'; // import Button element from MUI
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import InputAdornment from '@mui/material/InputAdornment';
import BadgeIcon from '@mui/icons-material/Badge';
import KeyIcon from '@mui/icons-material/Key';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('Technician');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        position: position,
      },
    });
  }; // end registerUser

  return (
    <Box sx={{ width: '35%', margin: 'auto' }}>
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <form onSubmit={registerUser}>
            <h2>Register User</h2>
            {errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {errors.registrationMessage}
              </h3>
            )}
            <TextField fullWidth required label="Username:" value={username} onChange={(event) => setUsername(event.target.value)} variant="outlined" margin="normal" InputProps={{ startAdornment: (<InputAdornment position="start"><BadgeIcon /></InputAdornment>), }} />
            <TextField fullWidth required label="Password:" type='password' value={password} onChange={(event) => setPassword(event.target.value)} variant="outlined" margin="normal" InputProps={{ startAdornment: (<InputAdornment position="start"><KeyIcon /></InputAdornment>), }} />

            <Select fullWidth required label="Position" value={position} onChange={(event) => setPosition(event.target.value)} >
              <MenuItem value='Technician'>Technician</MenuItem>
              <MenuItem value='Dispatcher'>Dispatcher</MenuItem>
            </Select>

            <CardActions sx={{ justifyContent: 'center' }}>
              <Button color="success" variant="contained" type='submit'>Register</Button>
            </CardActions>

          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterForm;
