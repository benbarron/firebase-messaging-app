import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../redux/state';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router';
import { Store } from 'antd/lib/form/interface';
import { Link } from 'react-router-dom';
import { register } from './../redux/actions/auth-actions';

interface RegisterProps extends RouteComponentProps {
  register: (email: string, password: string) => Promise<void>;
}

const Register: FC<RegisterProps> = (props: RegisterProps): JSX.Element => {
  const [error, setError] = useState<string>('');

  const onFinish = async (values: Store) => {
    try {
      await props.register(values.email, values.password);
      props.history.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div id='register-page'>
      <div className='register-form-wrapper z-depth-2'>
        <h1 className='form-header'>Register</h1>
        <Form
          name='normal_login'
          className='register-form'
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

          {error && <span style={{ color: '#aa0000' }}>{error}</span>}

          <Form.Item className={'form-row'}>
            <Button type='primary' htmlType='submit' className='register-button'>
              Register
            </Button>
          </Form.Item>
          <Form.Item className={'to-register'}>
            Already have an account? <Link to={'/login'}>Login</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({});

const mapDispatchToProps = {
  register
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
