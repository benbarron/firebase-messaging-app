import React, { FC, Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface NonUserHomeProps extends RouteComponentProps {}

const NonUserHome: FC<NonUserHomeProps> = (props: NonUserHomeProps): JSX.Element => {
  props.history.push('/login');
  return <Fragment></Fragment>;
};

export default withRouter(NonUserHome);
