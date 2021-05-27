import React, { useState, useRef } from 'react';
import style from '../SingleparticipantView/index.css';
import { Button } from '@material-ui/core';

export default function SingleParticipantView({ roomName }) {
  const urlRef = useRef();
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  const getMeetingUrl = () => {
    // if (process.env.NODE_ENV === 'production') {
    //   url = process.env.REACT_APP_PUBLIC_URL;
    // }
    return window.location.href;
  };

  //Maybe use a ref instead
  const copyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  // function copyToClipboard(e) {
  //   textAreaRef.current.select();
  //   document.execCommand('copy');
  //   // This is just personal preference.
  //   // I prefer to not show the whole text area selected.
  //   e.target.focus();
  //   setCopySuccess('Copied!');
  // }
  return (
    <div id="banner">
      <h3>There's a single participant. Invite some friends</h3>
      {/* <a target="_blank" href={getMeetingUrl()} rel="noreferrer">
        window.location.href
      </a> */}
      <p ref={urlRef}>{window.location.href}</p>

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
  );
}
