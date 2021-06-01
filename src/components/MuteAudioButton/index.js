export default function MuteAudioButton({ toggleAudio }) {
  return (
    <button className="buttons" onClick={toggleAudio}>
      Toggle Audio
    </button>
  );
}
