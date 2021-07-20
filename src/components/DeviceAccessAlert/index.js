import useStyles from './styles';
import { DEVICE_ACCESS_STATUS } from './../constants';

const askDeviceMessage =
  'To join the video room, your browser will request access to your cam and mic.';
const deniedDeviceMessage =
  'It seems your browser is blocked from accessing your camera and/or microphone';

export default function DeviceAccessAlert({ accessStatus }) {
  const classes = useStyles();
  console.log('DeviceAccessAlert1', accessStatus);
  const messageToDisplay =
    accessStatus === DEVICE_ACCESS_STATUS.PENDING
      ? askDeviceMessage
      : deniedDeviceMessage;
  const imgToDisplay =
    accessStatus === DEVICE_ACCESS_STATUS.PENDING
      ? '/images/access-dialog-pending.png'
      : '/images/access-dialog-rejected.png';
  console.log('DeviceAccessAlert2', messageToDisplay);
  return (
    <div className={classes.centeredContent}>
      <div className={classes.centeredText}>
        <h2 className={classes.devicesText}>{messageToDisplay}</h2>
        <img
          src={imgToDisplay}
          alt="Access Dialog"
          className={classes.devicesImages}
        ></img>
      </div>
    </div>
  );
}
