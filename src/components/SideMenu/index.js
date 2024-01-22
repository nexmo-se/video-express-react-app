import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import MeetingInfo from '../MeetingInfo';
import Chat from '../Chat';
import List from '@mui/material/List';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import Divider from '@mui/material/Divider';

import AppBar from '@mui/material/AppBar';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TimerIcon from '@mui/icons-material/Timer';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function TabPanel(props) {
  //   const [value, setValue] = React.useState(0);
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>{children}</Box>
        </Container>
      )}
    </div>
  );
}

const SideMenu = ({ participants, room, localParticipant, listOfMessages }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Chat" {...a11yProps(0)} />
          <Tab label="List of Participants" {...a11yProps(1)} />
          <Tab label="Meeting info" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Chat room={room} listOfMessages={listOfMessages} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MeetingInfo roomId={room.roomId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List>
          {participants && (
            //Adding +! as currently participants do not include self
            <>
              <ListItem key={'participants_counter'}>
                <ListItemIcon>
                  <GroupIcon variant="contained" color="primary" />
                </ListItemIcon>
                Participants ({participants.length + 1})
              </ListItem>
            </>
          )}
          {localParticipant && (
            <>
              <ListItem key={localParticipant.id}>
                <ListItemIcon>
                  <PersonIcon variant="contained" color="primary" />
                </ListItemIcon>
                <ListItemText primary={localParticipant.name} />
              </ListItem>
              <Divider />
            </>
          )}
          {participants &&
            participants?.length > 0 &&
            participants.map((e) => {
              return (
                <>
                  <ListItem key={e.id}>
                    <ListItemIcon>
                      <PersonIcon variant="contained" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={e.name} />
                  </ListItem>

                  <Divider />
                </>
              );
            })}
        </List>
      </TabPanel>
    </div>
  );
};

export default SideMenu;
