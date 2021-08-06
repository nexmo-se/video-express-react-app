import React from 'react';
import ChatInput from '../ChatInput';
import styles from './styles';
import useSignal from '../../hooks/useSignal';
import useRoom from '../../hooks/useRoom';

const Chat = ({ room }) => {
  React.useEffect(() => {}, [room]);
  const { sendSignal } = useSignal({ room });

  room.on('signal:text', event => {
    console.log(event);
    if (event.isSentByMe) return;
    // // createNewChatMessage(event.data, event.from.name);
    // else {
    //   resetUnreadCounter();
    // }
  });

  const sendMessage = () => {
    console.log('sending signal');
    if (room) sendSignal('sds', 'text');
  };

  const classes = styles();
  return (
    <div className={classes.chatInput}>
      <ChatInput sendMessage={sendMessage}></ChatInput>
    </div>
  );
};

export default Chat;
