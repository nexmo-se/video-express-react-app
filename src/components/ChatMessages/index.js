import React from 'react';
import styles from './styles';
import { Typography, emphasize } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import ContactsIcon from '@material-ui/icons/Contacts';

const ChatMessages = ({ chatMessages }) => {
  const classes = styles();
  return (
    <div>
      {chatMessages &&
        chatMessages.length &&
        chatMessages.map(e => {
          return (
            // <div className={classes.chatContainer}>
            //   <div className={e.isSentByMe ? classes.mine : classes.others}>
            //     {e.data}
            //   </div>
            // </div>
            <div className={classes.messageContainer}>
              <div className={classes.chatAvatar}>
                <ContactsIcon className={classes.iconChat} />
                <Typography color="textSecondary" variant="subtitle1">
                  {e?.from ? `${e.from.camera._stream.name}:` : 'Me:'}
                </Typography>
              </div>
              <div className={classes.chatAvatar}>
                <ChatIcon className={classes.iconChat} />
                <Typography color="textPrimary" variant="body1">
                  {e.data}
                </Typography>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ChatMessages;
