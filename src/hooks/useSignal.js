import React from 'react';
import moment from 'moment';
import { EMOJIS } from '../utils';

export default function useSignal({ room }) {
  const [listOfMessages, setListOfMessages] = React.useState([]);

  const sendSignal = React.useCallback(
    (data, type) => {
      if (room) {
        room.signal({ type: type, data: data }).catch((e) => e);
      }
    },
    [room]
  );

  const signalListener = React.useCallback(({ data, isSentByMe, from }) => {
    const date = moment(new Date().getTime()).format('HH:mm');
    addMessageToList(data, isSentByMe, from, date);
  }, []);

  const removeEmoji = (node, element) => {
    document.getElementById(element).removeChild(node);
  };

  const emojiHandler = React.useCallback(({ data, isSentByMe, from }) => {
    const elementToInsertEmoji = isSentByMe
      ? 'MP_camera_publisher_default_controls'
      : from.camera.id;
    const node = document.createElement('div');
    node.appendChild(document.createTextNode(EMOJIS[data]));
    node.classList.add('emoji');
    document.getElementById(elementToInsertEmoji).appendChild(node);

    node.addEventListener('animationend', (e) => {
      removeEmoji(e.target, elementToInsertEmoji);
    });
  }, []);

  const addMessageToList = React.useCallback((data, isSentByMe, from, date) => {
    setListOfMessages((prev) => [...prev, { data, isSentByMe, from, date }]);
  }, []);

  React.useEffect(() => {
    if (room) {
      room.on('signal:text', signalListener);
      room.on('signal:emoji', emojiHandler);
    }
    return function cleanup() {
      if (room) {
        room.off('signal:text', signalListener);
        room.off('signal:emoji', emojiHandler);
      }
    };
  }, [room, signalListener, emojiHandler]);

  return {
    sendSignal,
    listOfMessages,
  };
}
