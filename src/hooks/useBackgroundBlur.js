import * as VideoEffects from '@vonage/video-effects';

import { useState, useEffect, useCallback } from 'react';

const { isSupported, BackgroundBlurEffect } = VideoEffects;

export default function useBackgroundBlur() {
  const [mediaTrack, setMediaTrack] = useState(null);
  const [outputVideoStream, setOutputVideoStream] = useState(null);

  const getUserMedia = useCallback(async () => {
    try {
      console.log('getting user media');
      const track = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      return track;
      // setMediaTrack(track);
      // const backgroundBlur = new BackgroundBlurEffect({
      //   assetsPath: process.env.REACT_APP_ASSETS_PATH,
      // });

      // await backgroundBlur.loadModel();
      // setOutputVideoStream(backgroundBlur.startEffect(mediaTrack));
    } catch (e) {
      console.log('OT get user media error ' + e);
    }
  }, []);

  // useEffect(() => {
  //   getUserMedia();
  // }, [getUserMedia]);

  return {
    mediaTrack,
    getUserMedia,
    outputVideoStream,
    // addMessageToList
  };
}
