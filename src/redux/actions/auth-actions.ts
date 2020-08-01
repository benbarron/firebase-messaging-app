import { Dispatch, Action } from 'redux';
import { Actions } from '../actions';
import { ReduxState } from '../state';
import { auth, User } from 'firebase';

export const loginUserWithEmailAndPassword = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action<Actions>>, getState: () => ReduxState): Promise<void> => {
    try {
      await auth().setPersistence(auth.Auth.Persistence.SESSION);
      let cred: auth.UserCredential = await auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: Actions.AUTH_SET_USER_LOGGED_IN, payload: { user: cred.user } });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const register = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action<Actions>>, getState: () => ReduxState): Promise<void> => {
    try {
      let cred: auth.UserCredential = await auth().createUserWithEmailAndPassword(email, password);
      dispatch({ type: Actions.AUTH_SET_USER_LOGGED_IN, payload: { user: cred.user } });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};

export const listenForAuthChange = () => {
  return async (dispatch: Dispatch<Action<Actions>>, getState: () => ReduxState): Promise<void> => {
    auth().onAuthStateChanged((user: User | null) => {
      dispatch({ type: Actions.AUTH_SET_USER_LOGGED_IN, payload: { user } });
    });
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<Action<Actions>>, getState: () => ReduxState): Promise<void> => {
    await auth().signOut();
    dispatch({ type: Actions.AUTH_SET_USER_LOGGED_OUT });
  };
};
