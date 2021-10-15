import React, { useState, useRef } from 'react';

export default function useCopyMeetingUrl() {
  const copyUrl = React.useCallback(() => {
    //https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        // console.log('Meeting URL copied');
      },
      () => {
        // console.log('Copy failed');
      }
    );
  }, []);

  return {
    copyUrl
  };
}
