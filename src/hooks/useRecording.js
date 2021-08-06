import { useState, useCallback, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
/* import { v4 as uuid } from "uuid"; */

export default function useRecording({ room }) {
  const [isRecording, setIsRecording] = useState(false);

  async function sendRecordingSignal({ data }) {
    return new Promise((resolve, reject) => {
      const payload = JSON.parse(
        JSON.stringify({ type: 'recording', data: JSON.stringify(data) })
      );
      if (room) {
        room.signal(payload, (err) => {
          if (err) reject(err);
          else resolve();
        });
      }
    });
  }

  const recordingListener = useCallback(({ data }) => {
    const jsonData = JSON.parse(data);
    console.log('recordingListener', jsonData);
    const isRecordingData = jsonData.isRecording;
    setIsRecording(isRecordingData);
  }, []);

  useEffect(() => {
    if (room) {
      room.on('signal:recording', recordingListener);
    }
    return function cleanup() {
      if (room) room.off('signal:recording', recordingListener);
    };
  }, [room, recordingListener]);

  return { isRecording, sendRecordingSignal };
}
