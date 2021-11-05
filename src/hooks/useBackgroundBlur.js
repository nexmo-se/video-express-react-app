import { TrackChangesRounded } from '@material-ui/icons';
import * as VideoEffects from '@vonage/video-effects';

import { useState, useEffect, useCallback, useRef } from 'react';

const { isSupported, BackgroundBlurEffect } = VideoEffects;

export default function useBackgroundBlur() {
  // const [mediaTrack, setMediaTrack] = useState(null);
  // const [outputVideoStream, setOutputVideoStream] = useState(null);

  // const backgroundBlur = useRef(null);
  // const track = useRef(null);

  const getUserMedia = useCallback(async () => {
    console.log('calling gum');
    try {
      console.log('getting user media');
      const track = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      return track;
    } catch (e) {
      console.log('OT get user media error ' + e);
    }
  }, []);

  const destroyTracks = (localMediaTrack) => {
    if (localMediaTrack) {
      console.log(localMediaTrack);
      localMediaTrack.getTracks().forEach((t) => t.stop());
    }
  };

  // const startBackgroundBlur = useCallback(async () => {
  //   await getUserMedia();
  //   backgroundBlur.current = new BackgroundBlurEffect({
  //     assetsPath: process.env.REACT_APP_ASSETS_PATH,
  //   });
  //   return backgroundBlur.current;
  //   // await backgroundBlur.current.loadModel();
  //   // outputThingy.current = backgroundBlur.startEffect(track.current);
  // }, [getUserMedia]);

  // useEffect(() => {
  //   startBackgroundBlur();
  // }, [startBackgroundBlur]);

  return {
    // mediaTrack: track.current,
    getUserMedia,
    destroyTracks,
    // outputVideoStream,
    // startBackgroundBlur,
    // backgroundBlurEffectTeta: backgroundBlur.current,
    // addMessageToList
  };
}
