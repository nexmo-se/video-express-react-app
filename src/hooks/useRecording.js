import { useState, useCallback, useEffect } from 'react';

export default function useRecording({ room }) {
  const [isRecording, setIsRecording] = useState(false);

  async function sendRecordingSignal({ data }) {
    return new Promise((resolve, reject) => {
      const payload = JSON.parse(
        JSON.stringify({ type: 'recording', data: JSON.stringify(data) })
      );
      if (room) {
        room.signal(payload, (err) => { // todo if someone joins later, I need to send the signal to him as well
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
