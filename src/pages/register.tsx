import React, { FC, useState } from 'react';
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

interface RegisterProps extends RouteComponentProps {
  register: (email: string, password: string) => Promise<void>;
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

const Register: FC<RegisterProps> = (props: RegisterProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [snackBar, setSnackBar] = useState<SnackBarType>(initialSnackBar);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const register = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      return setSnackBar({
        type: 'error',
        message: 'Please enter an email address and password.',
        show: true
      });
    }

    try {
      const auth: firebase.auth.Auth = firebase.auth();
      await auth.createUserWithEmailAndPassword(email, password);
      props.history.push('/');
    } catch (err) {
      setSnackBar({
        type: 'error',
        message: err.message,
        show: true
      });
    }
  };

  const closeSnackBar = (e: any) => {
    setSnackBar({
      type: '',
      message: '',
      show: false
    });
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
    <div id='register-page'>
      <Alert />
      <div className='register-form-wrapper'>
        <Card style={{ padding: 20 }}>
          <CardHeader title='Register' style={{ textAlign: 'center', marginTop: 10 }} />
          <CardContent>
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
              </FormGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(Register);
