import React from 'react';
import styles from './styles';
import { Typography } from '@material-ui/core';

import ContactsIcon from '@material-ui/icons/Contacts';

const ChatMessages = ({ chatMessages, chatClass }) => {
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    scrollToLastMessage();
  }, [chatMessages]);

  const scrollToLastMessage = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const classes = styles();
  return (
    <div className={chatClass}>
      {chatMessages && chatMessages.length > 0 ? (
        chatMessages.map((msg, key) => {
          return (
            <div
              ref={messagesEndRef}
              className={`${classes.messageContainer} ${
                msg?.from?.name ? '' : classes.myMessage
              }`}
              key={key}
            >
              <div className={classes.chatAvatar}>
                <ContactsIcon className={classes.iconChat} />
                <Typography color="textSecondary" variant="subtitle1">
                  {msg?.from?.name ? `${msg.from.name}:` : 'Me:'}
                  {/* <span className={classes.time}>{msg.date}</span> */}
                </Typography>
                <Typography
                  className={classes.time}
                  color="textSecondary"
                  variant="subtitle1"
                >
                  {msg.date}
                </Typography>
              </div>
              <div className={classes.chatContent}>
                {/* <ChatIcon className={classes.iconChat} /> */}
                <Typography color="textPrimary" variant="body1">
                  {msg.data}
                </Typography>
              </div>
            </div>
          );
        })
      ) : (
        <div>There are no messages</div>
      )}
    </div>
  );
};

export default ChatMessages;
