import React, { FC, Fragment, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Container, Grid, Avatar, IconButton, Button } from '@material-ui/core';
import { User } from 'firebase';
import firebase from 'firebase';
import groupsCreate from './groups-create';
import { SendOutlined } from '@material-ui/icons';

interface GroupsMessagesProps extends RouteComponentProps<{ id: string }> {}

const GroupsMessages: FC<GroupsMessagesProps> = (props: GroupsMessagesProps): JSX.Element => {
  const user: User | null = firebase.auth().currentUser;
  const firestore: firebase.firestore.Firestore = firebase.firestore();

  const [messages, setMessages] = useState<any[]>([]);
  const [group, setGroup] = useState<any>({ members: [] });
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    firestore
      .collection('messages')
      .where('groupId', '==', props.match.params.id)
      .onSnapshot(snap => {
        setMessages(
          snap.docs
            .map((doc: any) => ({ ...doc.data(), id: doc.id }))
            .sort((a: any, b: any) => {
              if (new Date(a.dateCreated) > new Date(b.dateCreated)) {
                return 1;
              } else {
                return -1;
              }
            })
        );
      });
    firestore
      .collection('groups')
      .doc(props.match.params.id)
      .onSnapshot(snap => {
        setGroup({
          ...snap.data(),
          id: snap.id
        });
      });
  }, []);

  const sendMessage = async (e: any) => {
    if (!newMessage) {
      return;
    }

    try {
      firestore.collection('messages').add({
        dateCreated: new Date().toJSON(),
        groupId: props.match.params.id,
        text: newMessage,
        user: {
          uid: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL
        }
      });
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Container>
        <div id='message-board'>
          <div className='group-info-area'>
            <div className='group-name'>
              <h3>{group.name}</h3>
            </div>
            <div className='group-members'>
              <h3>{group.members.length} Member(s)</h3>
            </div>
          </div>
          <div className='messages-list'>
            {messages.map((message, i) => (
              <div
                className={message.user.uid === user?.uid ? 'message-self' : 'message-other'}
                key={i}
              >
                <div className='message-row'>
                  <div className='user-profile-image'>
                    <Avatar src={message.user.photoURL || ''} />
                  </div>
                  <div className='message-content'>
                    <b>{message.user.displayName}</b>
                    <small>
                      {' - '} {new Date(message.dateCreated).toLocaleString()}
                    </small>
                    <p>{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='new-message-area'>
            <Grid container className='input-wrapper'>
              <Grid item xs={10}>
                <input
                  type='text'
                  placeholder='Type your message here...'
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                />
              </Grid>
              <Grid item xs={2} className='send-button-wrapper'>
                <IconButton className='send-button' onClick={sendMessage}>
                  <SendOutlined />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default withRouter(GroupsMessages);
