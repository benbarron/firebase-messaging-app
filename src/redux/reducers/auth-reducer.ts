import { Actions } from '../actions';
import { User } from 'firebase';

const initialState: User | null = null;

export default (state: User | null = initialState, action: any): User | null => {
  switch (action.type) {
    case Actions.AUTH_SET_USER_LOGGED_IN:
      return action.payload.user;

    case Actions.AUTH_SET_USER_LOGGED_OUT:
      return null;

    default:
      return state;
  }
};
