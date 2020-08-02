import React, { FC, useState } from 'react';
import firebase, { User } from 'firebase';
import { withRouter, RouteComponentProps } from 'react-router';
import { Grid, FormGroup, FormControl, TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

interface CreateGroupProps extends RouteComponentProps {}

interface SnackBarType {
  type: 'error' | 'warning' | 'info' | 'success' | '';
  message: string;
  show: boolean;
}

const initialSnackBar: SnackBarType = {
  show: false,
  message: '',
  type: ''
};

const CreateGroup: FC<CreateGroupProps> = (props: CreateGroupProps): JSX.Element => {
  const user: User | null = firebase.auth().currentUser;
  const [groupName, setGroupName] = useState<string>('');
  const [groupDesc, setGroupDesc] = useState<string>('');
  const [snackBar, setSnackBar] = useState<SnackBarType>(initialSnackBar);

  const closeSnackBar = (e: any) => {
    setSnackBar({
      type: '',
      message: '',
      show: false
    });
  };

  const handleGroupNameChange = (e: any) => {
    setGroupName(e.target.value);
  };

  const handleGroupDescChange = (e: any) => {
    setGroupDesc(e.target.value);
  };

  const createGroup = async (e: any): Promise<void> => {
    if (!groupName || !groupDesc) {
      return setSnackBar({
        type: 'error',
        message: 'A name and description are both required',
        show: true
      });
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
      setSnackBar({
        type: 'success',
        message: `${groupName} has been created`,
        show: true
      });
      setGroupName('');
      setGroupDesc('');
    } catch (err) {
      setSnackBar({
        type: 'error',
        message: err.message,
        show: true
      });
    }
  };

  const Alert = (alertProps: any): JSX.Element => (
    <Snackbar
      open={snackBar.show}
      autoHideDuration={5000}
      onClose={closeSnackBar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert elevation={6} variant={'filled'} {...alertProps} severity={snackBar.type}>
        {snackBar.message}
      </MuiAlert>
    </Snackbar>
  );

  return (
    <Grid container>
      <Alert />
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
