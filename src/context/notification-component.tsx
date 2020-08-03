import React, { FC, useContext } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { NotificationContext } from './notifcation-context';
import { Notification } from './notification-reducer';
import { Snackbar, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';

interface NotificationFCProps {}

const useStyles = makeStyles({
  alert: {
    cursor: 'pointer'
  }
});

export const NotificationFC: FC<any> = (props: any): JSX.Element => {
  const notification: Notification = useContext(NotificationContext);
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (e: any) => {
    if (notification.redirect) {
      history.push(notification.redirect);
    }
  };

  return (
    <Snackbar
      open={notification.show}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      className={classes.alert}
      onClick={handleClick}
    >
      <MuiAlert elevation={6} variant={'filled'} severity={notification.type}>
        {notification.message}
      </MuiAlert>
    </Snackbar>
  );
};
