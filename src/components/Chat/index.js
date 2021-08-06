import React from 'react';
import ChatInput from '../ChatInput';
import styles from './styles';
import useSignal from '../../hooks/useSignal';
import useRoom from '../../hooks/useRoom';

const Chat = ({ room }) => {
  const [chatMessages, setChatMessages] = React.useState([]);
  React.useEffect(() => {}, [room]);
  const { sendSignal } = useSignal({ room });

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
