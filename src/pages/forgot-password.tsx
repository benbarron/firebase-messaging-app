import React, { FC, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../redux/state';
import { withRouter, RouteComponentProps } from 'react-router';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { Link } from 'react-router-dom';
import { auth } from 'firebase';

interface ForgotPasswordProps extends RouteComponentProps {}

const ForgotPassword: FC<ForgotPasswordProps> = (props: ForgotPasswordProps): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>('');

  const onFinishEmail = async (values: Store) => {
    try {
      await auth().sendPasswordResetEmail(values.email);
      setEmail(values.email);
      setStep(1);
    } catch (err) {
      message.error(err.message);
    }
  };

  const emailForm: JSX.Element = (
    <Form
      name='normal_login'
      className='forgot-form'
      initialValues={{ remember: true }}
      onFinish={onFinishEmail}
    >
      <Form.Item>
        <small className='form-instruction'>
          To reset your passsword, please enter the email address that is registered with your
          account below.
        </small>
      </Form.Item>
      <Form.Item
        className={'form-row'}
        name='email'
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
      </Form.Item>
      <Form.Item className={'form-row'}>
        <Button type='primary' htmlType='submit' className='forgot-button'>
          Send Passcode
        </Button>
      </Form.Item>
    </Form>
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

  return (
    <div id='forgot-page'>
      <div className='forgot-form-wrapper z-depth-2' style={{ textAlign: 'center' }}>
        <h1 className='form-header'>Forgot Password</h1>
        {step == 0 ? emailForm : acknowledgment}
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));
