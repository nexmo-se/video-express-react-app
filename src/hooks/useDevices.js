import { useState, useEffect } from 'react';

export default function useDevices() {
  const [deviceInfo, setDeviceInfo] = useState({
    audioInputDevices: [],
    videoInputDevices: [],
    audioOutputDevices: []
  });

  useEffect(() => {
    const getDevices = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log('enumerateDevices() not supported.');
        return;
      }
      try {
        const devices = await MP.getDevices();
        // navigator.mediaDevices.enumerateDevices().then((devices) => {
        const audioInputDevices = devices.filter(
          d => d.kind.toLowerCase() === 'audioinput'
        );
        const audioOutputDevices = devices.filter(
          d => d.kind.toLowerCase() === 'audiooutput'
        );
        const videoInputDevices = devices.filter(
          d => d.kind.toLowerCase() === 'videoinput'
        );
        setDeviceInfo({
          audioInputDevices,
          videoInputDevices,
          audioOutputDevices
        });
        // });
      } catch (err) {
        console.log('[loadDevices] - ', err);
      }
    };
    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    getDevices();

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    };
  }, []);
  return { deviceInfo };
}
