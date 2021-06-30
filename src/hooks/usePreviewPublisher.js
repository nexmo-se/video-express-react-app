import React, { useState, useRef, useCallback, useContext } from 'react';

export default function usePreviewPublisher() {
  let previewPublisher = useRef();
  let [logLevel, setLogLevel] = useState(0);
  const MP = window.MP;
  const [previewMediaCreated, setPreviewMediaCreated] = useState(false);

  const calculateAudioLevel = React.useCallback(audioLevel => {
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
        console.log('[createPreview]', publisherProperties);
        previewPublisher.current = new MP.PreviewPublisher(targetEl);
        previewPublisher.current.on('audioLevelUpdated', audioLevel => {
          calculateAudioLevel(audioLevel);
        });
        await previewPublisher.current.previewMedia({
          targetElement: targetEl,
          publisherProperties
        });
        setPreviewMediaCreated(true);
        console.log('[Preview Created] - ', previewPublisher);
      } catch (err) {
        console.log('[createPreview]', err);
      }
    },
    [MP.PreviewPublisher, calculateAudioLevel]
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
    previewMediaCreated
  };
}
