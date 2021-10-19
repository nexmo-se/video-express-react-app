import React from 'react';
import moment from 'moment';

export default function useSignal({ room }) {
  const [listOfMessages, setListOfMessages] = React.useState([]);

  const sendSignal = React.useCallback((data, type) => {
    if (room) {
      room
        .signal({ type: type, data: data })
        .catch(e => e);
    }
  }, []);

  const signalListener = React.useCallback(({ data, isSentByMe, from }) => {
    // console.log(data);
    const date = moment(new Date().getTime()).format('HH:mm');
    addMessageToList(data, isSentByMe, from, date);
    // console.log('who sent it' + isSentByMe);
  }, []);

  const addMessageToList = React.useCallback((data, isSentByMe, from, date) => {
    setListOfMessages(prev => [...prev, { data, isSentByMe, from, date }]);
  }, []);

  React.useEffect(() => {
    if (room) {
      room.on('signal:text', signalListener);
    }
    return function cleanup() {
      if (room) room.off('signal:text', signalListener);
    };
  }, [room, signalListener]);

  // React.useEffect(() => {}, [listOfMessages]);

  return {
    sendSignal,
    listOfMessages
    // addMessageToList
  };
}
