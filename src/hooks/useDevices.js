import { useState, useEffect, useCallback } from 'react';
import * as MP from '@vonage/multiparty';

export default function useDevices() {
  const [deviceInfo, setDeviceInfo] = useState({
    audioInputDevices: [],
    videoInputDevices: [],
    audioOutputDevices: []
  });

  const getDevices = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log('enumerateDevices() not supported.');
      return;
    }
    try {
      const devices = await MP.getDevices();
      const audioInputDevices = devices.filter(
        (d) => d.kind.toLowerCase() === 'audioinput'
      );
      const audioOutputDevices = devices.filter(
        (d) => d.kind.toLowerCase() === 'audiooutput'
      );
      const videoInputDevices = devices.filter(
        (d) => d.kind.toLowerCase() === 'videoinput'
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
  }, []);

  useEffect(() => {
    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    getDevices();

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    };
  }, [getDevices]);

  return { deviceInfo, getDevices };
}
