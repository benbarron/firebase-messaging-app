import React, { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface UserSettingsProps extends RouteComponentProps {}

const UserSettings: FC<UserSettingsProps> = (props: UserSettingsProps): JSX.Element => {
  return <></>;
};

export default withRouter(UserSettings);
