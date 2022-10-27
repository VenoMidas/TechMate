import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
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

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Box sx={{ width: '35%', margin: 'auto' }}>
      <Card>
        <CardContent sx={{textAlign: 'center'}}>
          <form onSubmit={login}>
            <h2>Login</h2>
            {errors.loginMessage && (
              <h3 className="alert" role="alert">
                {errors.loginMessage}
              </h3>
            )}
            <TextField fullWidth required label="Username:" value={username} onChange={(event) => setUsername(event.target.value)} variant="outlined" margin="normal" InputProps={{ startAdornment: (<InputAdornment position="start"><BadgeIcon /></InputAdornment>), }} />
            <TextField fullWidth required label="Password:" type='password' value={password} onChange={(event) => setPassword(event.target.value)} variant="outlined" margin="normal" InputProps={{ startAdornment: (<InputAdornment position="start"><KeyIcon /></InputAdornment>), }} />
            <CardActions sx={{justifyContent: 'center'}}>
              <Button color="success" variant="contained" type='submit'>Log In</Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginForm;


