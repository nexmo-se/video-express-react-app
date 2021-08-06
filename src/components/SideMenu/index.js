import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MeetingInfo from '../MeetingInfo';
import Chat from '../Chat';
import List from '@material-ui/core/List';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';

import AppBar from '@material-ui/core/AppBar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TimerIcon from '@material-ui/icons/Timer';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const SideMenu = ({ participants }) => {
  const [counter, setCounter] = React.useState(0);
  const [second, setSecond] = React.useState('00');
  const [minute, setMinute] = React.useState('00');

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  React.useEffect(() => {
    let intervalId;

    intervalId = setInterval(() => {
      setCounter(counter => counter + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter]);

  //   useEffect(() => {
  //     if (participants) setParticipants(participants);
  //     console.log(participants);
  //   }, [participants]);

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
        <Chat />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MeetingInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {participants?.length === 0 && <div>There are no participants yet</div>}
        {participants &&
          participants.map(e => {
            const minutesSinceJoin = Math.floor(
              (new Date().getTime() / 1000 - e.startTime) / 60
            );
            const secondsSinceJoin =
              Math.floor(new Date().getTime() / 1000 - e.startTime) % 60;
            return (
              <div>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon variant="contained" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      // className={localClasses.versionLabel}
                      primary={`Participant Id: ${e.id} `}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <TimerIcon variant="contained" color="primary" />
                    </ListItemIcon>
                    Active Time:
                    {` ${minutesSinceJoin}  minutes `}
                    {`${secondsSinceJoin} seconds`}
                  </ListItem>
                  <Divider />
                </List>
                {/* <div>Participant Id: {e.id}</div>
                <div></div> */}
              </div>
            );
          })}
        {/* {console.log(participantList)} */}
      </TabPanel>
    </div>
  );
};

export default SideMenu;
