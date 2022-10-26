import { useParams } from "react-router";
import { useContext, useEffect, useRef, useState } from "react";
import { getCredentials } from "../../api/fetchCreds";
import styles from "./styles.js";
import useRoom from "../../hooks/useRoom";
import { UserContext } from "../../context/UserContext";

import ToolBar from "components/ToolBar";

import NetworkToast from "components/NetworkToast";
import useScreenSharing from "../../hooks/useScreenSharing";

export default function VideoRoom() {
  const { user } = useContext(UserContext);
  const [credentials, setCredentials] = useState(null);
  const [error, setError] = useState(null);
  const { createCall, room, participants, connected, networkStatus, cameraPublishing, localParticipant } = useRoom();
  const { isScreenSharing, startScreenSharing, stopScreenSharing } = useScreenSharing({ room });
  const roomContainer = useRef();
  const classes = styles();
  let { roomName } = useParams();

  useEffect(() => {
    getCredentials(roomName)
      .then(({ data }) => {
        setCredentials({
          apikey: data.apiKey,
          sessionId: data.sessionId,
          token: data.token,
        });
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, [roomName]);

  useEffect(() => {
    if (credentials) {
      createCall(credentials, roomContainer.current, user.userName, user.videoFilter, {
        ...user.defaultSettings,
      });
    }
  }, [createCall, credentials, user]);

  if (error) return <div className={classes.errorContainer}>There was an error fetching the data from the server</div>;

  return (
    <div id="callContainer" className={classes.callContainer}>
      <div id="roomContainer" className={classes.roomContainer} ref={roomContainer}>
        <NetworkToast networkStatus={networkStatus} />
        <div id="screenSharingContainer" className={classes.screenSharingContainer}>
          {isScreenSharing && <div className={classes.screenSharingOverlay}>You Are Screensharing</div>}
        </div>
      </div>
      <ToolBar
        room={room}
        participants={participants}
        localParticipant={localParticipant}
        connected={connected}
        cameraPublishing={cameraPublishing}
        isScreenSharing={isScreenSharing}
        startScreenSharing={startScreenSharing}
        stopScreenSharing={stopScreenSharing}
      ></ToolBar>
    </div>
  );
}
