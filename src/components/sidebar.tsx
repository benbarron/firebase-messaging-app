import React, { FC, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import {
  makeStyles,
  List,
  ListItem,
  SwipeableDrawer,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import { GroupOutlined, ExitToApp, SettingsOutlined, HomeOutlined } from '@material-ui/icons';
import firebase from 'firebase';

interface SideBarProps extends RouteComponentProps {
  setIsSideBarCollapsed: (value: boolean) => void;
  collapsed: boolean;
}

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

const SideBar: FC<SideBarProps> = (props: SideBarProps): JSX.Element => {
  const classes = useStyles();

  const logout = async (): Promise<void> => {
    const auth: firebase.auth.Auth = firebase.auth();
    await auth.signOut();
    props.history.push('/');
  };

  const navigate = (path: string): void => {
    props.history.push(path);
    props.setIsSideBarCollapsed(true);
  };

  const SidebarList = () => (
    <List className={classes.list}>
      <ListItem button onClick={(e) => navigate('/')}>
        <ListItemIcon>
          <HomeOutlined />
        </ListItemIcon>
        <ListItemText primary={'Home'} />
      </ListItem>
      <Divider />
      <ListItem button onClick={(e) => navigate('/groups')}>
        <ListItemIcon>
          <GroupOutlined />
        </ListItemIcon>
        <ListItemText primary={'Groups'} />
      </ListItem>
      <Divider />
      <ListItem button onClick={(e) => navigate('/settings')}>
        <ListItemIcon>
          <SettingsOutlined />
        </ListItemIcon>
        <ListItemText primary={'Settings'} />
      </ListItem>
      <Divider />
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary={'Logout'} />
      </ListItem>
    </List>
  );

  return (
    <Fragment>
      <SwipeableDrawer
        anchor={'left'}
        open={!props.collapsed}
        onClose={() => props.setIsSideBarCollapsed(true)}
        onOpen={() => props.setIsSideBarCollapsed(false)}
      >
        <SidebarList />
      </SwipeableDrawer>
    </Fragment>
  );
};

export default withRouter(SideBar);
