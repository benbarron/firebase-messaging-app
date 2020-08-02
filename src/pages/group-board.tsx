import React, { FC, Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface GroupBoardProps extends RouteComponentProps<{ id: string }> {}

const GroupBoard: FC<GroupBoardProps> = (props: GroupBoardProps): JSX.Element => {
  return (
    <Fragment>
      <h1>Group with id: {props.match.params.id}</h1>
    </Fragment>
  );
};

export default withRouter(GroupBoard);
