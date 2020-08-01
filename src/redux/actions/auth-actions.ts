import { Dispatch, Action } from 'redux';
import { auth, User } from 'firebase';
import { Actions } from '../actions';
import { ReduxState } from '../state';

export const loginWithEmailAndPassword = (email: string, password: string, remember: boolean) => {
  return async (dispatch: Dispatch<Action<Actions>>, getState: () => ReduxState): Promise<void> => {
    try {
      const { SESSION, NONE } = auth.Auth.Persistence;
      await auth().setPersistence(remember ? SESSION : NONE);
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
