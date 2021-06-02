import { useEffect, useState } from 'react';
import { fetchRecordings } from '../../api/fetchRecording';
import { useParams } from 'react-router';
import GetAppIcon from '@material-ui/icons/GetApp';
import { IconButton, Icon } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useHistory } from 'react-router-dom';

import styles from './styles';

export default function EndCall() {
  const { push } = useHistory();
  const [recordings, setRecordings] = useState(null);
  const classes = styles();
  const { sessionId } = useParams();

  const redirectNewMeeting = () => {
    push('');
  };
  useEffect(() => {
    try {
      fetchRecordings(sessionId).then(data => {
        setRecordings(data.data);
        // setCredentials({ apikey, sessionId, token });
        console.log(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.meetingInfo}>
        <h2>This is an amazing meeting</h2>
        <h2>I hope you have had fun with us</h2>

        <p>Here is a perfect spot for adding colourful details</p>
        <p>Memorable insights and bla,bla,bla</p>
        <IconButton
          onClick={redirectNewMeeting}
          className={classes.new__meeting}
        >
          Start new meeting
        </IconButton>
      </div>
      <div className={classes.banner}>
        <Card className={classes.centeredFlex} variant="outlined">
          <CardContent>
            <h3>These are your recordings</h3>

            {/* <p ref={urlRef}>{window.location.href}</p> */}
          </CardContent>
          <CardActions>
            <div className={classes.root}>
              {recordings
                ? recordings.map(recording => (
                    <div className={classes.recording}>
                      <li key={recording.id}>
                        Started at: {Date(recording.createdAt)}
                        <IconButton
                          edge="start"
                          color="inherit"
                          aria-label="mic"
                          // onClick={handleRecordingAction}
                        >
                          {recording.status === 'available' ? (
                            <GetAppIcon fontSize="inherit" />
                          ) : null}
                        </IconButton>
                      </li>
                    </div>
                  ))
                : null}
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
