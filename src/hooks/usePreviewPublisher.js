import React, { useState, useRef, useCallback, useContext } from 'react';
import { DEVICE_ACCESS_STATUS } from './../components/constants';
import useDevices from '../hooks/useDevices';
import * as VideoExpress from '@vonage/video-express';

export default function usePreviewPublisher() {
  let previewPublisher = useRef();
  let [logLevel, setLogLevel] = useState(0);
  const [previewMediaCreated, setPreviewMediaCreated] = useState(false);
  const [accessAllowed, setAccessAllowed] = useState(
    DEVICE_ACCESS_STATUS.PENDING
  );
  const { deviceInfo, getDevices } = useDevices();

  const calculateAudioLevel = React.useCallback((audioLevel) => {
    let movingAvg = null;
    if (movingAvg === null || movingAvg <= audioLevel) {
      movingAvg = audioLevel;
    } else {
      movingAvg = 0.8 * movingAvg + 0.2 * audioLevel;
    }
    // 1.5 scaling to map the -30 - 0 dBm range to [0,1]
    const currentLogLevel = Math.log(movingAvg) / Math.LN10 / 1.5 + 1;
    setLogLevel(Math.min(Math.max(currentLogLevel, 0), 1) * 100);
  }, []);

  const createPreview = useCallback(
    async (targetEl, publisherOptions) => {
      try {
        const publisherProperties = Object.assign({}, publisherOptions);
        // console.log('[createPreview]', publisherProperties);
        previewPublisher.current = new VideoExpress.PreviewPublisher(targetEl);
        previewPublisher.current.on('audioLevelUpdated', (audioLevel) => {
          calculateAudioLevel(audioLevel);
        });
        previewPublisher.current.on('accessAllowed', (audioLevel) => {
          // console.log('[createPreview] - accessAllowed');
          setAccessAllowed(DEVICE_ACCESS_STATUS.ACCEPTED);
          getDevices();
        });
        previewPublisher.current.on('accessDenied', (audioLevel) => {
          // console.log('[createPreview] - accessDenied');
          setAccessAllowed(DEVICE_ACCESS_STATUS.REJECTED);
        });
        await previewPublisher.current.previewMedia({
          targetElement: targetEl,
          publisherProperties
        });

        setPreviewMediaCreated(true);
        /* console.log(
          '[Preview Created] - ',
          previewPublisher.current.getVideoDevice()
        ); */
      } catch (err) {
        // console.log('[createPreview]', err);
      }
    },
    [calculateAudioLevel, getDevices]
  );

  const destroyPreview = useCallback(() => {
    if (previewPublisher && previewPublisher.current) {
      previewPublisher.current.destroy();
      console.log('[destroyPreview] - ', previewPublisher);
    }
  }, []);

  return {
    previewPublisher: previewPublisher.current,
    createPreview,
    destroyPreview,
    logLevel,
    previewMediaCreated,
    accessAllowed,
    deviceInfo
  };
}
