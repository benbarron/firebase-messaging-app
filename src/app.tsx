import React, { FC, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/state';
import { authedRoutes, unAuthedRoutes } from './routes';
import { Route, Switch, Redirect, RouteComponentProps, withRouter } from 'react-router';
import { listenForAuthChange } from './redux/actions/auth-actions';
import { User, auth } from 'firebase';

interface Props extends RouteComponentProps {
  listenForAuthChange: () => Promise<void>;
  user: User | null;
}

const App: FC<Props> = (props: Props): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    props.listenForAuthChange().then(() => setLoading(false));
    return () => {};
  }, [props.user, auth().currentUser]);

  const loggedInRoutes: JSX.Element = (
    <Fragment>
      {authedRoutes.map((route, i) => (
        <Switch key={i}>
          <Route path={route.path} exact={route.exact} component={route.component} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      ))}
    </Fragment>
  );

  const notLoggedInRoutes: JSX.Element = (
    <Fragment>
      {unAuthedRoutes.map((route, i) => (
        <Switch key={i}>
          <Route path={route.path} exact={route.exact} component={route.component} />
          {/* <Route render={() => <Redirect to='login' />} /> */}
        </Switch>
      ))}
    </Fragment>
  );

  const loader: JSX.Element = <></>;

  return loading ? loader : props.user ? loggedInRoutes : notLoggedInRoutes;
};

const mapStateToProp = (state: ReduxState) => ({
  user: state.user
});

const mapDispatchToProps = {
  listenForAuthChange
};

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(App));
