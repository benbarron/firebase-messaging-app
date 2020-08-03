export interface Notification {
  type: 'error' | 'warning' | 'info' | 'success';
  message: string | null;
  show: boolean;
  redirect: string | null;
  displayNotification: (message: string, type: string, redirect: string | null) => void;
  clearNotification?: () => void;
}

export const NotificationReducer = (state: any, action: any): Notification => {
  switch (action.type) {
    case 'DISPLAY_NOTIFICATION':
      return {
        ...state,
        show: true,
        type: action.payload.type,
        message: action.payload.message,
        redirect: action.payload.redirect
      };

    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        show: false,
        message: '',
        redirect: ''
      };

    default:
      return state;
  }
};
