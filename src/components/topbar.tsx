import React, { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { ReduxState } from '../redux/state';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Input, Avatar } from 'antd';
import { User } from 'firebase';
import { Link } from 'react-router-dom';
import { logout } from './../redux/actions/auth-actions';

interface TopBarProps extends RouteComponentProps {
  user: User | null;
  toggleSideBar: (value: boolean) => void;
  logout: () => Promise<void>;
}

const TopBar: FC<TopBarProps> = (props: TopBarProps): JSX.Element => {
  const logout = async () => {
    await props.logout();
    props.history.push('/login');
  };

  const userActionsMenu: JSX.Element = (
    <Menu>
      <Menu.Item>
        <Link to='profile'>
          <strong>Go To Profile</strong>
        </Link>
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <strong>Logout</strong>
      </Menu.Item>
    </Menu>
  );

  const userAvatar = <Avatar src={String(props.user?.photoURL)} className='user-avatar' />;

  const defaultAvatar = <Avatar icon={<UserOutlined />} />;

  return (
    <Fragment>
      <div className='top-nav-branding'>
        <h1>Brand Name</h1>
      </div>
      <div className='top-nav-content'>
        <div className='search-box-wrapper'>
          <Input
            size='middle'
            placeholder='Search...'
            prefix={<SearchOutlined />}
            className='search-box'
          />
        </div>
        <div className='userinfo-box'>
          <Dropdown overlay={userActionsMenu} placement='bottomCenter' className='z-depth-1'>
            {props.user?.photoURL ? userAvatar : defaultAvatar}
          </Dropdown>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.user
});

const mapDispatchToProps = {
  logout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));
