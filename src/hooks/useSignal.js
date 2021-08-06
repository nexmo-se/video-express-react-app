import React from 'react';

export default function useSignal({ room }) {
  room.on('signal:text', event => {
    console.log(event);
    // if (event.isSentByMe) return;
    addMessageToList(event.data);
  });

  //   const addMessageToList = (message, listOfMessages) => {
  //     return [listOfMessages, message];
  //   };

  const sendSignal = React.useCallback((data, type) => {
    console.log('[useSignal] - sendSignal');
    if (room) {
      room
        .signal({ type: type, data: data })
        .then(response => {
          response;
        })
        .catch(e => e);
    }
  }, []);

  return {
    sendSignal,
    addMessageToList
  };
}
