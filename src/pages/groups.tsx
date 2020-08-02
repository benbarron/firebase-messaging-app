import React, { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Container, Grid } from '@material-ui/core';
import CreateGroup from './../components/create-group';
import OwnedGroups from './../components/owned-groups';

interface MessagesProps extends RouteComponentProps {}

const Groups: FC<MessagesProps> = (props: MessagesProps): JSX.Element => {
  return (
    <Container style={{ marginTop: 20 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CreateGroup />
        </Grid>
        <Grid item xs={12} md={6}>
          <OwnedGroups />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(Groups);
