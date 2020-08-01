import React, { FC } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { ReduxState } from '../redux/state';
import { Form, Button } from 'antd';

interface NonUserHomeProps extends RouteComponentProps {}

const NonUserHome: FC<NonUserHomeProps> = (props: NonUserHomeProps): JSX.Element => {
  return (
    <div id='nonuser-homepage'>
      <div className='nonuser-homepage-wrapper z-depth-2'>
        <h3 style={{ textAlign: 'center' }}>Welcome To Firebase Messaging</h3>
        <br />
        <Form className='register-form'>
          <Form.Item className={'form-row'}>
            <Button
              type='primary'
              className='register-button'
              onClick={(e) => props.history.push('/register')}
            >
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type='default'
              className='register-button'
              onClick={(e) => props.history.push('/login')}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NonUserHome));
