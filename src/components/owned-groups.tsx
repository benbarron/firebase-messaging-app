import React, { FC, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import firebase, { User } from 'firebase';
import { Card, CardContent, Grid, makeStyles } from '@material-ui/core';

interface OwnedGroupsProps extends RouteComponentProps {}

const useStyles = makeStyles({
  card: {
    marginBottom: 20,
    cursor: 'pointer'
  }
});

const OwnedGroups: FC<OwnedGroupsProps> = (props: OwnedGroupsProps): JSX.Element => {
  const classes = useStyles();
  const [groups, setGroups] = useState<any[]>([]);
  const firestore: firebase.firestore.Firestore = firebase.firestore();

  useEffect(() => {
    const user: User | null = firebase.auth().currentUser;
    if (!user) return;

    firestore
      .collection('groups')
      .where('ownerId', '==', user?.uid)
      .onSnapshot(query => {
        setGroups(query.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });
  }, []);

  return (
    <>
      <h1>Groups You Own</h1>
      {groups.map(group => (
        <Card
          key={group.id}
          className={classes.card}
          onClick={e => props.history.push(`/group/${group.id}`)}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                {group.name}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default withRouter(OwnedGroups);
