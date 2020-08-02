import React, { FC, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { auth } from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
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
import MuiAlert from '@material-ui/lab/Alert';
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';

interface LoginProps extends RouteComponentProps {
  loginWithEmailAndPassword: (e: string, p: string, r: boolean) => Promise<void>;
  loginWithGithub: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

interface SnackBarType {
  type: 'error' | 'warning' | 'info' | 'success' | '';
  message: string;
  show: boolean;
}

const initialSnackBar: SnackBarType = {
  show: false,
  message: '',
  type: ''
};

const Login: FC<LoginProps> = (props: LoginProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(true);
  const [snackBar, setSnackBar] = useState<SnackBarType>(initialSnackBar);

  const toggleRemember = () => setRemember(!remember);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const closeSnackBar = (e: any) => {
    setSnackBar({
      type: '',
      message: '',
      show: false
    });
  };

  const firebaseUiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      auth.GoogleAuthProvider.PROVIDER_ID, //
      auth.GithubAuthProvider.PROVIDER_ID
    ]
  };

  const login = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      return setSnackBar({
        type: 'error',
        message: 'Email and password are required',
        show: true
      });
    }

    try {
      const auth: firebase.auth.Auth = firebase.auth();
      const { NONE, SESSION } = firebase.auth.Auth.Persistence;
      auth.setPersistence(remember ? SESSION : NONE);
      await auth.signInWithEmailAndPassword(email, password);
      props.history.push('/');
    } catch (err) {
      setSnackBar({
        type: 'error',
        message: err.message,
        show: true
      });
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

  const RememberCheckBox = (checkboxProps: any): JSX.Element => (
    <Checkbox
      {...checkboxProps}
      checked={remember}
      size={'small'}
      color={'default'}
      onChange={toggleRemember}
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );

  const Alert = (alertProps: any): JSX.Element => (
    <Snackbar
      open={snackBar.show}
      autoHideDuration={5000}
      onClose={closeSnackBar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert elevation={6} variant={'filled'} {...alertProps} severity={snackBar.type}>
        {snackBar.message}
      </MuiAlert>
    </Snackbar>
  );

  return (
    <div id='login-page'>
      <Alert />
      <div className='login-form-wrapper'>
        <Card style={{ padding: 20 }}>
          <CardHeader title='Login' style={{ textAlign: 'center', marginTop: 10 }} />
          <CardContent>
            <form onSubmit={login}>
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
                <FormControl style={{ marginBottom: 40, padding: '0px 10px' }}>
                  <Grid container spacing={2} justify={'space-between'}>
                    <FormControlLabel label={'Remember Me'} control={<RememberCheckBox />} />
                    <Link to='/forgot-password' style={{ display: 'flex', alignItems: 'center' }}>
                      Forgot Password
                    </Link>
                  </Grid>
                </FormControl>
                <FormControl style={{ marginBottom: 40 }}>
                  <Button variant={'contained'} color='default' onClick={login}>
                    Login
                  </Button>
                </FormControl>
                <FormControl>
                  <p>
                    Don't have an account? <Link to={'/register'}>Sign up here.</Link> Or...
                  </p>
                </FormControl>
                <FormControl>
                  <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={firebase.auth()} />
                </FormControl>
              </FormGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(Login);
