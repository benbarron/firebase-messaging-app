import React, { FC, useState, useMemo, useEffect, useContext } from 'react';
import { Grid, Container, Card, CardContent, Button } from '@material-ui/core';
import firebase, { User } from 'firebase';
import { withRouter, RouteComponentProps } from 'react-router';
import { NotificationContext } from '../context/notifcation-context';

interface GroupsJoinProps extends RouteComponentProps {}

const GroupsJoin: FC<GroupsJoinProps> = (props: GroupsJoinProps): JSX.Element => {
  const firestore: firebase.firestore.Firestore = firebase.firestore();
  const user: User | null = firebase.auth().currentUser;
  const notification = useContext(NotificationContext);

  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    firestore.collection('groups').onSnapshot(snap => {
      const res: any[] = snap.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .filter((doc: any) => doc.ownerId != user?.uid)
        .filter((doc: any) => !doc.members.includes(user?.uid));
      setSearchResults(res);
    });
  }, []);

  const joinGroup = async (id: string) => {
    const group = await (await firestore.collection('groups').doc(id).get()).data();
    const members = group?.members;
    if (!members.includes(user?.uid)) {
      members.push(user?.uid);
      await firestore.collection('groups').doc(id).update({ members });
    }
    notification.displayNotification(`You have joined: ${group?.name}`, 'success', null);
    props.history.push(`/groups/${id}/messages`);
  };

  return (
    <Container maxWidth={'sm'} style={{ marginTop: 40 }}>
      <h1>Public Groups To Join</h1>
      <Grid container style={{ marginTop: 40 }}>
        {searchResults.map((result, i) => (
          <Grid item key={i} xs={12} style={{ marginTop: 20 }}>
            <Card>
              <CardContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <b>{result.name}</b>
                  <br />
                  <small>{result.description}</small>
                </div>
                <Button onClick={() => joinGroup(result.id)}>Join</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default withRouter(GroupsJoin);
