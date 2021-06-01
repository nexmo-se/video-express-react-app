export default function ScreenSharingButton({ room }) {
  const startScreenSharing = async () => {
    if (room) {
      await room.startScreensharing();
      //   setScreen(room.screen);
    }
  };

  return (
    <button className="buttons" onClick={startScreenSharing}>
      share screen
    </button>
  );
}
