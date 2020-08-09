import React, { FC, useState, useEffect } from 'react';
import { Grid, Container, Card, CardContent, Button } from '@material-ui/core';
import firebase, { User } from 'firebase';
import { withRouter, RouteComponentProps } from 'react-router';

interface SearchGroupsProps extends RouteComponentProps {}

const SearchGroups: FC<SearchGroupsProps> = (props: SearchGroupsProps): JSX.Element => {
  const firestore: firebase.firestore.Firestore = firebase.firestore();
  const user: User | null = firebase.auth().currentUser;

  const [joinedGroups, setJoinedGroups] = useState<any[]>([]);

  useEffect(() => {
    firestore
      .collection('groups')
      .where('members', 'array-contains', user?.uid)
      .onSnapshot(snap => {
        setJoinedGroups(snap.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
      });
  }, []);

  return (
    <Container maxWidth={'sm'} style={{ marginTop: 40, marginBottom: 100 }}>
      <h1>Groups You're a member in</h1>
      {joinedGroups.map((group, i) => (
        <Card
          key={i}
          style={{ marginTop: 50, cursor: 'pointer' }}
          onClick={e => props.history.push(`/groups/${group.id}/messages`)}
        >
          <CardContent>
            <b>{group.name}</b>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default withRouter(SearchGroups);
