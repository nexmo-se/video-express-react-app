import React from 'react';

export default function useSignal({ room }) {
  const [listOfMessages, setListOfMessages] = React.useState([]);

  const sendSignal = React.useCallback((data, type) => {
    console.log('[useSignal] - sendSignal');
    if (room) {
      room
        .signal({ type: type, data: data })
        .then(() => {
          console.log('signal sent');
        })
        .catch(e => e);
    }
  }, []);

  const signalListener = React.useCallback(({ data, isSentByMe, from }) => {
    // console.log(data);
    addMessageToList(data, isSentByMe, from);
    // console.log('who sent it' + isSentByMe);
  }, []);

  const addMessageToList = React.useCallback((data, isSentByMe, from) => {
    setListOfMessages(prev => [...prev, { data, isSentByMe, from }]);
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
