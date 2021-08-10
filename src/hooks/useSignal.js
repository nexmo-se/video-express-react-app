import React from 'react';

export default function useSignal({ room }) {
  //   const addMessageToList = (message, listOfMessages) => {
  //     return [listOfMessages, message];
  //   };

  const sendSignal = React.useCallback((data, type) => {
    console.log('[useSignal] - sendSignal');
    if (room) {
      room
        .signal({ type: type, data: data })
        .catch(e => e);
    }
  }, [room]);

  const signalListener = React.useCallback(({ data }) => {
    console.log(data);
    // const jsonData = JSON.parse(data);
    console.log('signalListener', data);
  }, []);

  React.useEffect(() => {
    if (room) {
      room.on('signal:text', signalListener);
    }
    return function cleanup() {
      if (room) room.off('signal:text', signalListener);
    };
  }, [room, signalListener]);

  return {
    sendSignal
    // addMessageToList
  };
}
