import React, { FC, Fragment, useState, useEffect, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Grid, Avatar, IconButton, Button } from '@material-ui/core';
import { User } from 'firebase';
import firebase from 'firebase';
import { SendOutlined } from '@material-ui/icons';
import { NotificationContext } from '../context/notifcation-context';

interface GroupsMessagesProps extends RouteComponentProps<{ id: string }> {}

const GroupsMessages: FC<GroupsMessagesProps> = (props: GroupsMessagesProps): JSX.Element => {
  const user: User | null = firebase.auth().currentUser;
  const firestore: firebase.firestore.Firestore = firebase.firestore();
  const notification = useContext(NotificationContext);

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
    e.preventDefault();

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

  const leaveGroup = async (e: any) => {
    let { id } = props.match.params;
    let group = await (await firestore.collection('groups').doc(id).get()).data();
    let members = group?.members;
    if (group?.ownerId == user?.uid) {
      notification.displayNotification('You cannot leave a group that you created.', 'error', null);
    }
    if (members.includes(user?.uid)) {
      members = members.filter((u: string) => u != user?.uid);
      await firestore.collection('groups').doc(id).update({ members });
    }
    notification.displayNotification(`You have left group: ${group?.name}`, 'success', null);
    props.history.push(`/`);
  };

  return (
    <Fragment>
      <div id='message-board'>
        <div className='group-info-area'>
          <div className='group-name'>
            <h3>
              {group.name}
              {'  -  '}
              {group.members.length} Member(s)
            </h3>
          </div>
          <div className='group-members'>
            {group?.ownerId !== user?.uid && (
              <Button onClick={leaveGroup} variant='contained'>
                Leave Group
              </Button>
            )}
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
              <form onSubmit={sendMessage}>
                <input
                  type='text'
                  placeholder='Type your message here...'
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                />
              </form>
            </Grid>
            <Grid item xs={2} className='send-button-wrapper'>
              <IconButton className='send-button' onClick={sendMessage}>
                <SendOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(GroupsMessages);
