import React, { useReducer } from 'react';
import { Notification, NotificationReducer } from './notification-reducer';
import { createContext } from 'react';

const initialState: Notification = {
  show: false,
  message: '',
  type: 'success',
  redirect: null,
  displayNotification: () => {},
  clearNotification: () => {}
};

interface Props {
  children: JSX.Element;
}

export const NotificationContext = createContext(initialState);

export const NotificationProvider = (props: Props): JSX.Element => {
  const [state, dispatch] = useReducer(NotificationReducer, initialState);

  const displayNotification = (message: string, type: string, redirect: string | null = null) => {
    dispatch({
      type: 'DISPLAY_NOTIFICATION',
      payload: { message, type, redirect }
    });
    setTimeout(() => clearNotification(), 5000);
  };

  const clearNotification = () => {
    dispatch({
      type: 'CLEAR_NOTIFICATION'
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        show: state.show,
        message: state.message,
        type: state.type,
        redirect: state.redirect,
        displayNotification,
        clearNotification
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
