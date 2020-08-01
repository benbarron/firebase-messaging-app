import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../redux/state';
import { withRouter, RouteComponentProps } from 'react-router';

interface NotFoundProps extends RouteComponentProps {}

const NotFound: FC<NotFoundProps> = (props: NotFoundProps): JSX.Element => {
  return <></>;
};

const mapStateToProps = (state: ReduxState) => ({});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotFound));
