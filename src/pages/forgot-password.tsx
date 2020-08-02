import React, { FC, useState, Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Store } from 'antd/lib/form/interface';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {
  Snackbar,
  Card,
  CardHeader,
  CardContent,
  FormGroup,
  FormControl,
  Button,
  TextField
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

interface ForgotPasswordProps extends RouteComponentProps {}

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

const ForgotPassword: FC<ForgotPasswordProps> = (props: ForgotPasswordProps): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [snackBar, setSnackBar] = useState<SnackBarType>(initialSnackBar);

  const handleEmailChange = (e: any) => setEmail(e.target.value);

  const closeSnackBar = (e: any) => {
    setSnackBar({
      type: '',
      message: '',
      show: false
    });
  };

  const sendResetEmail = async (e: any) => {
    e.preventDefault();

    if (!email) {
      return setSnackBar({
        type: 'error',
        message: 'Please enter the email address that is associated with your account.',
        show: true
      });
    }
    try {
      const auth: firebase.auth.Auth = firebase.auth();
      await auth.sendPasswordResetEmail(email);
      setStep(1);
    } catch (err) {
      setSnackBar({
        type: 'error',
        message: err.message,
        show: true
      });
    }
  };

  const emailForm: JSX.Element = (
    <form onSubmit={sendResetEmail}>
      <FormGroup>
        <FormControl>
          <small style={{ textAlign: 'center' }}>
            Please enter the email address that is associated with you account. We will then send
            you an email with instructions on how to reset you password.
          </small>
        </FormControl>
        <FormControl style={{ marginBottom: 20 }}>
          <TextField
            id='email-input'
            label='Email Address'
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>
        <FormControl>
          <Button color={'default'} variant={'contained'} onClick={sendResetEmail}>
            Send Reset Email
          </Button>
        </FormControl>
      </FormGroup>
    </form>
  );

  const acknowledgment: JSX.Element = (
    <Fragment>
      <small>
        If an account is associated with the email address {email}, an email with password reset
        instructions will be sent to {email}.
      </small>
      <br />
      <Link to='/login'>Back To Login</Link>
    </Fragment>
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
    <div id='forgot-page'>
      <Alert />
      <div className='forgot-form-wrapper'>
        <Card style={{ padding: 20 }}>
          <CardHeader title='Password Reset' style={{ textAlign: 'center', marginTop: 10 }} />
          <CardContent>{step == 0 ? emailForm : acknowledgment}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(ForgotPassword);
