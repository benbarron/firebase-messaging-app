import React, { FC, Fragment, useEffect, useState } from 'react';
import { authedRoutes, unAuthedRoutes } from './routes';
import { Route, Switch, Redirect, RouteComponentProps, withRouter } from 'react-router';
import firebase, { User } from 'firebase';
import TopBar from './components/topbar';

interface Props extends RouteComponentProps {}

const App: FC<Props> = (props: Props): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user: User | null = firebase.auth().currentUser;
    setIsLoggedIn(user ? true : false);
  }, []);

  firebase.auth().onAuthStateChanged((user: User | null) => {
    setIsLoggedIn(user ? true : false);
  });

  const loggedInRoutes: JSX.Element = (
    <Fragment>
      <TopBar />
      <Switch>
        {authedRoutes.map((route, i) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
        <Route render={() => <Redirect to={'/'} />} />
      </Switch>
    </Fragment>
  );

  const notLoggedInRoutes: JSX.Element = (
    <Fragment>
      <Switch>
        {unAuthedRoutes.map((route, i) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
        <Route render={() => <Redirect to={'/'} />} />
      </Switch>
    </Fragment>
  );

  return isLoggedIn ? loggedInRoutes : notLoggedInRoutes;
};

export default withRouter(App);
