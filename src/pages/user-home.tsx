import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../redux/state';
import { withRouter, RouteComponentProps } from 'react-router';
import { logout } from './../redux/actions/auth-actions';
import { User } from 'firebase';
import SideBar from '../components/sidebar';
import TopBar from '../components/topbar';

interface UserHomeProps extends RouteComponentProps {
  user: User | null;
  logout: () => Promise<void>;
}

const UserHome: FC<UserHomeProps> = (props: UserHomeProps): JSX.Element => {
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState<boolean>(false);

  const toggleIsSideBarCollapsed = () => setIsSideBarCollapsed(!isSideBarCollapsed);

  const logout = async () => {
    await props.logout();
    props.history.push('/login');
  };

  return (
    <div className='user-home-wrapper'>
      <div className='top-nav-wrapper z-depth-1'>
        <TopBar toggleSideBar={toggleIsSideBarCollapsed} />
      </div>
      <div className='side-nav-wrapper'>
        <SideBar collapsed={isSideBarCollapsed} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.user
});

const mapDispatchToProps = {
  logout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHome));
