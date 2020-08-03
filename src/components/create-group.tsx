import React, { FC, useState, useContext } from 'react';
import firebase, { User } from 'firebase';
import { withRouter, RouteComponentProps } from 'react-router';
import { Grid, FormGroup, FormControl, TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Notification } from '../context/notification-reducer';
import { NotificationContext } from '../context/notifcation-context';

interface CreateGroupProps extends RouteComponentProps {}

const CreateGroup: FC<CreateGroupProps> = (props: CreateGroupProps): JSX.Element => {
  const user: User | null = firebase.auth().currentUser;
  const [groupName, setGroupName] = useState<string>('');
  const [groupDesc, setGroupDesc] = useState<string>('');
  const notification: Notification = useContext(NotificationContext);

  const handleGroupNameChange = (e: any) => {
    setGroupName(e.target.value);
  };

  const handleGroupDescChange = (e: any) => {
    setGroupDesc(e.target.value);
  };

  const createGroup = async (e: any): Promise<void> => {
    if (!groupName || !groupDesc) {
      return notification.displayNotification(
        'A name and description are both required',
        'error',
        null
      );
    }

    try {
      const db = firebase.firestore();
      await db.collection('groups').add({
        dateCreated: new Date().toJSON(),
        ownerId: user?.uid,
        name: groupName,
        description: groupDesc,
        members: [user?.uid]
      });
      notification.displayNotification(`${groupName} has been created`, 'success', null);
      setGroupName('');
      setGroupDesc('');
    } catch (err) {
      notification.displayNotification(err.message, 'error', null);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Create A Group</h1>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={createGroup}>
          <FormGroup>
            <FormControl style={{ marginBottom: 30 }}>
              <TextField
                type={'text'}
                id='group-name'
                label='Group Name (Required)'
                value={groupName}
                onChange={handleGroupNameChange}
              />
            </FormControl>
            <FormControl style={{ marginBottom: 30 }}>
              <TextField
                type={'text'}
                id='group-name'
                label='Group Description (Required)'
                value={groupDesc}
                onChange={handleGroupDescChange}
              />
            </FormControl>
            <FormControl>
              <Button
                onClick={createGroup}
                variant={'contained'}
                color={'primary'}
                style={{ width: 200 }}
              >
                Create
              </Button>
            </FormControl>
          </FormGroup>
        </form>
      </Grid>
    </Grid>
  );
};

export default withRouter(CreateGroup);
