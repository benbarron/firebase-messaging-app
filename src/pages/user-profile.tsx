import React, { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface UserProfileProps extends RouteComponentProps {}

const UserProfile: FC<UserProfileProps> = (props: UserProfileProps): JSX.Element => {
  return <></>;
};

export default withRouter(UserProfile);
