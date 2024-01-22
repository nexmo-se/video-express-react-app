import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreIcon from '@mui/icons-material/More';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import HouseIcon from '@mui/icons-material/House';
import styles from './styles';
import Tooltip from '@mui/material/Tooltip';
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
