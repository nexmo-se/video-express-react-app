import React from 'react';

export default function useSignal({ room }) {
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
    sendSignal
  };
}
