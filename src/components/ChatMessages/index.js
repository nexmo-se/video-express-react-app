import React from 'react';
import styles from './styles';
import { Typography, emphasize } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import ContactsIcon from '@material-ui/icons/Contacts';

const ChatMessages = ({ chatMessages }) => {
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    scrollToLastMessage();
  }, [chatMessages]);

  const scrollToLastMessage = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const classes = styles();
  return (
    <div>
      {chatMessages &&
        chatMessages.length &&
        chatMessages.map(e => {
          return (
            <div ref={messagesEndRef} className={classes.messageContainer}>
              <div className={classes.chatAvatar}>
                <ContactsIcon className={classes.iconChat} />
                <Typography color="textSecondary" variant="subtitle1">
                  {e?.from ? `${e.from.camera._stream.name}:` : 'Me:'}
                  {/* <span className={classes.time}>{e.date}</span> */}
                </Typography>
                <Typography
                  className={classes.time}
                  color="textSecondary"
                  variant="subtitle1"
                >
                  {e.date}
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
      {chatMessages && chatMessages.length === 0 && (
        <div>There are no messages</div>
      )}
    </div>
  );
};

export default ChatMessages;
