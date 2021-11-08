import { TrackChangesRounded } from '@material-ui/icons';
import * as VideoEffects from '@vonage/video-effects';

import { useState, useEffect, useCallback, useRef } from 'react';

const { isSupported, BackgroundBlurEffect } = VideoEffects;

export default function useBackgroundBlur() {
  const getUserMedia = useCallback(async () => {
    try {
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
      localMediaTrack.getTracks().forEach((t) => t.stop());
    }
  };

  return {
    getUserMedia,
    destroyTracks,
  };
}
