import { useState } from 'react';

export default function ScreenSharingButton({ room }) {
  const [isScreenSharing, setScreenSharing] = useState(false);

  const handleScreenSharing = () => {
    isScreenSharing ? stopScreenSharing() : startScreenSharing();
  };

  const stopScreenSharing = () => {
    if (isScreenSharing) {
      room.stopScreensharing();
      setScreenSharing(false);
    }
  };
  const startScreenSharing = async () => {
    if (room) {
      try {
        await room.startScreensharing();
        setScreenSharing(true);
      } catch (e) {
        console.log(e);
      }
      //   setScreen(room.screen);
    }
  };

  return (
    <button className="buttons" onClick={handleScreenSharing}>
      share screen
    </button>
  );
}
