import React, { FC, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Store } from 'antd/lib/form/interface';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import MuiAlert from '@material-ui/lab/Alert';
import {
  Card,
  CardHeader,
  CardContent,
  FormGroup,
  FormControl,
  InputAdornment,
  TextField,
  IconButton,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  Snackbar
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { NotificationContext } from '../context/notifcation-context';
import { Notification } from '../context/notification-reducer';

interface RegisterProps extends RouteComponentProps {
  register: (email: string, password: string) => Promise<void>;
}

const Register: FC<RegisterProps> = (props: RegisterProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const notification: Notification = useContext(NotificationContext);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const register = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      return notification.displayNotification(
        'Both email and password are required.',
        'error',
        null
      );
    }

    try {
      const auth: firebase.auth.Auth = firebase.auth();
      await auth.createUserWithEmailAndPassword(email, password);
      props.history.push('/');
    } catch (err) {
      notification.displayNotification(err.message, 'error', null);
    }
  };

  const passwordProps = {
    endAdornment: (
      <InputAdornment position='start'>
        <IconButton aria-label='toggle password visibility' onClick={toggleShowPassword}>
          {!showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  };

  return (
    <div id='register-page'>
      <div className='register-form-wrapper'>
        <Card style={{ padding: 20 }}>
          <CardContent>
            <Grid container justify='space-between' alignItems='center'>
              <Grid item>
                <h1>Register</h1>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <form onSubmit={register}>
              <FormGroup>
                <FormControl style={{ marginBottom: 20 }}>
                  <TextField
                    id='email-input'
                    label='Email Address'
                    value={email}
                    onChange={handleEmailChange}
                  />
                </FormControl>
                <FormControl style={{ marginBottom: 40 }}>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    id='password-input'
                    label='Password'
                    InputProps={passwordProps}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </FormControl>
                <FormControl style={{ marginBottom: 40 }}>
                  <Button variant={'contained'} color='default' onClick={register}>
                    Login
                  </Button>
                </FormControl>
                <FormControl>
                  <p>
                    Already have an account? <Link to={'/login'}>Sign in here.</Link>
                  </p>
                </FormControl>
              </FormGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(Register);
