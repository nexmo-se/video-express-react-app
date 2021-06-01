import style from './index.css';

import { useCallback } from 'react';

export default function MuteAudioButton({ room }) {
  const toggleAudio = useCallback(() => {
    if (room) {
      const camera = room.camera;
      const isAudioEnabled = camera.isAudioEnabled();
      isAudioEnabled ? camera.disableAudio() : camera.enableAudio();
    }
    return;
  }, [room]);

  return (
    <button className="buttons" onClick={toggleAudio}>
      Toggle Audio
    </button>
  );
}
