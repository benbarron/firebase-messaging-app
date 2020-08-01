import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../redux/state';
import { withRouter, RouteComponentProps } from 'react-router';
import { logout } from './../redux/actions/auth-actions';
import { User } from 'firebase';

interface UserHomeProps extends RouteComponentProps {
  user: User | null;
  logout: () => Promise<void>;
}

const UserHome: FC<UserHomeProps> = (props: UserHomeProps): JSX.Element => {
  const logout = async () => {
    await props.logout();
    props.history.push('/login');
  };

  return (
    <>
      <h1>user home</h1>
      <h1>{props.user?.email}</h1>
      <button onClick={logout}>Logout</button>
      <img src={props.user?.photoURL || ''} alt='' />
    </>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.user
});

const mapDispatchToProps = {
  logout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHome));
