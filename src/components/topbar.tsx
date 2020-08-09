import React, { FC, Fragment, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import firebase, { User } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar } from '@material-ui/core';
import SideBar from './sidebar';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  menuIconButton: {},
  logoutIconButton: {
    marginLeft: 20,
    cursor: 'pointer'
  },
  avatar: {
    width: 40,
    height: 40,
    cursor: 'pointer'
  },
  appbar: {
    background: '#0984e3'
  }
}));

interface TopBarProps extends RouteComponentProps {}

const TopBar: FC<TopBarProps> = (props: TopBarProps): JSX.Element => {
  const classes = useStyles();
  const user: User | null = firebase.auth().currentUser;

  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState<boolean>(true);
  const toggleIsSideBarCollapsed = () => setIsSideBarCollapsed(!isSideBarCollapsed);

  return (
    <Fragment>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            className={classes.menuIconButton}
            color='inherit'
            aria-label='menu'
            onClick={toggleIsSideBarCollapsed}
          >
            <MenuIcon />
          </IconButton>
          <Avatar
            onClick={() => props.history.push('/profile')}
            className={classes.avatar + ' z-depth-1'}
            src={user?.photoURL || '/assets/default-avatar.png'}
          />
        </Toolbar>
      </AppBar>
      <SideBar collapsed={isSideBarCollapsed} setIsSideBarCollapsed={setIsSideBarCollapsed} />
    </Fragment>
  );
};

export default withRouter(TopBar);
