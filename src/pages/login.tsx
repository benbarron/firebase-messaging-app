import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../redux/state';
import { withRouter, RouteComponentProps } from 'react-router';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Store } from 'antd/lib/form/interface';
import { auth } from 'firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { loginWithEmailAndPassword } from './../redux/actions/auth-actions';

interface LoginProps extends RouteComponentProps {
  loginWithEmailAndPassword: (e: string, p: string, r: boolean) => Promise<void>;
  loginWithGithub: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const Login: FC<LoginProps> = (props: LoginProps): JSX.Element => {
  const firebaseUiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      auth.GoogleAuthProvider.PROVIDER_ID, //
      auth.GithubAuthProvider.PROVIDER_ID
    ]
  };

  const onFinish = async (values: Store) => {
    try {
      const { email, password, remember } = values;
      await props.loginWithEmailAndPassword(email, password, remember);
      props.history.push('/');
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <div id='login-page'>
      <div className='login-form-wrapper z-depth-2'>
        <h1 className='form-header'>Login</h1>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            className={'form-row'}
            name='email'
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
          </Form.Item>
          <Form.Item
            className={'form-row'}
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item className={'form-row'}>
            <Form.Item className='remember-me' name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to={'/forgot-password'} className={'forgot-password'}>
              Forgot password
            </Link>
          </Form.Item>
          <Form.Item className={'form-row'}>
            <Button type='primary' htmlType='submit' className='login-button'>
              Log in
            </Button>
          </Form.Item>
          <Form.Item className={'to-register'}>
            <strong>
              Done have an account? <Link to={'/register'}>Sign Up.</Link> Or...
            </strong>
          </Form.Item>
          <Form.Item className={'form-row'}>
            <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={auth()} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({});

const mapDispatchToProps = {
  loginWithEmailAndPassword
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
