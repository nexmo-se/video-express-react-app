import React, { useState, useRef } from 'react';
import style from '../SingleparticipantView/index.css';
import { Button } from '@material-ui/core';

export default function SingleParticipantView({ roomName }) {
  const urlRef = useRef();

  const getMeetingUrl = () => {
    return window.location.href;
  };

  //Maybe use a ref instead
  const copyUrl = () => {
    //https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        console.log('Copy successfully');
      },
      () => {
        console.log('Copy failed');
      }
    );
  };

  return (
    <div id="banner">
      <h3>There's a single participant. Invite some friends</h3>

      <p ref={urlRef}>{window.location.href}</p>
      <div>
        <Button
          edge="end"
          color="primary"
          variant="contained"
          style={{ marginLeft: '50px' }}
          onClick={copyUrl}
        >
          Copy link to meeting{' '}
        </Button>
      </div>
    </div>
  );
}
