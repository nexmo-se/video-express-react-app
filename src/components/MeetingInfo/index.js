import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreIcon from '@material-ui/icons/More';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import HouseIcon from '@material-ui/icons/House';
import styles from './styles';
import Tooltip from '@material-ui/core/Tooltip';
import useCopyMeetingUrl from '../../hooks/useCopyMeetingUrl';
import QRCode from 'qrcode.react';

import React from 'react';
const MeetingInfo = ({ roomId }) => {
  const { copyUrl } = useCopyMeetingUrl();
  const [title, setTitle] = React.useState('Copy');
  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  };
  const titleToolTip = 'Meeting Info';

  const handleClick = () => {
    setTitle('Copied');
    copyUrl();
  };

  const handleClose = () => {
    setTimeout(() => {
      setTitle('Copy');
    }, 500);
  };
  const localClasses = styles();
  return (
    <List className={localClasses.list}>
      <div className={localClasses.container}>
        <Typography className={localClasses.header} variant="h5">
          Joining info
        </Typography>
        <ListItem>{window.location.href}</ListItem>
        <Tooltip title={title} onClose={handleClose} aria-label="add">
          <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            className={localClasses.button}
            endIcon={<FileCopyIcon>send</FileCopyIcon>}
          >
            Copy URL
          </Button>
        </Tooltip>
        <ListItem>
          <QRCode
            className={localClasses.qrCode}
            value={window.location.href}
          />
        </ListItem>

        <Divider />
        <Typography className={localClasses.header} variant="h5">
          App info
        </Typography>
        <ListItem>
          <ListItemIcon>
            <MoreIcon variant="contained" color="primary" />
          </ListItemIcon>
          <ListItemText
            className={localClasses.versionLabel}
            primary={`Version ` + process.env.REACT_APP_VERSION}
          />
        </ListItem>
        <ListItem className={localClasses.listItem}>
          <ListItemIcon>
            <HouseIcon variant="contained" color="primary" />
          </ListItemIcon>
          <ListItemLink
            href="https://github.com/nexmo-se/video-api-multiparty-sdk-sample-app"
            target="_blank"
          >
            <ListItemText primary="Source code" />
          </ListItemLink>
        </ListItem>
        <ListItem className={localClasses.listItem}>
          <ListItemIcon>
            <ChildFriendlyIcon variant="contained" color="primary" />
          </ListItemIcon>
          <ListItemLink
            href="https://www.npmjs.com/package/@vonage/video-express"
            target="_blank"
          >
            <ListItemText primary="Video Express" />
          </ListItemLink>
        </ListItem>
        <Divider />
        <Typography className={localClasses.header} variant="h5">
          Session info
        </Typography>

        <ListItem>
          <ListItemText
            className={localClasses.sessionLabel}
            secondary={`Session Id: ` + roomId}
          />
        </ListItem>
      </div>
    </List>
  );
};

export default MeetingInfo;
