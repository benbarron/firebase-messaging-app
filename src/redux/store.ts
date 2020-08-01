import { Store, Action, compose, createStore, applyMiddleware } from 'redux';
import { ReduxState } from './state';
import { Actions } from './actions';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';

declare const window: any;

const configureStore = (): Store<ReduxState, Action<Actions>> => {
  const middleware = [thunk];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));
  return store;
};

export default configureStore();
