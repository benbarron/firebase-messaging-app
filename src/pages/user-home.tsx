import React, { FC, Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Container, Grid } from '@material-ui/core';
import CreateGroup from './../components/create-group';
import OwnedGroups from './../components/owned-groups';

interface UserHomeProps extends RouteComponentProps {}

const UserHome: FC<UserHomeProps> = (props: UserHomeProps): JSX.Element => {
  return (
    <Fragment>
      <Container style={{ marginTop: 50 }}>
        <Grid container spacing={4}></Grid>
      </Container>
    </Fragment>
  );
};

export default withRouter(UserHome);
