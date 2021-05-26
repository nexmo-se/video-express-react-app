import React, { useState, useRef, useCallback } from 'react';

export function useRoom({ apikey, sessionId, token }) {
  const createCall = useCallback(
    ({ apikey, sessionId, token }) => {
      if (!apikey) {
        throw new Error('Missing apiKey');
      }

      if (!sessionId) {
        throw new Error('Missing sessionId');
      }

      if (!token) {
        throw new Error('Missing token');
      }
      const MP = window.MP;
      const room = new MP.Room({
        apiKey: apikey,
        sessionId: sessionId,
        token: token,
        roomContainer: 'roomContainer',
        useLayoutManager: true,
        managedLayoutOptions: {
          cameraPublisherContainer: 'roomContainer',
          screenPublisherContainer: 'roomContainer'
        }
      });
      room.join();
    },
    [apikey, sessionId, token]
  );

  return {
    createCall
  };
}
