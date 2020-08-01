import { combineReducers, Reducer, Action, CombinedState } from 'redux';
import authReducer from './auth-reducer';
import { ReduxState } from './../state';
import { Actions } from './../actions';

export const rootReducer: Reducer<any, Action<Actions>> = combineReducers({
  user: authReducer
});
