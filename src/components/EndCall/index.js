import { useEffect, useState } from 'react';
import { fetchRecordings } from '../../api/fetchRecording';
import { useParams } from 'react-router';
import GetAppIcon from '@mui/icons-material/GetApp';
import { IconButton } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import styles from './styles';

export default function EndCall() {
  const navigate = useNavigate();
  const [recordings, setRecordings] = useState(null);
  const classes = styles();
  const { sessionId } = useParams();

  const redirectNewMeeting = () => {
    navigate('/');
  };
  useEffect(() => {
    fetchRecordings(sessionId)
      .then(data => {
        if (data.data) {
          setRecordings(data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [sessionId]);

  return (
    <div className={classes.container}>
      <div className={classes.meetingInfo}>
        <h2>This is an amazing meeting</h2>
        <h2>I hope you have had fun with us</h2>

        <IconButton
          onClick={redirectNewMeeting}
          className={classes.new__meeting}
          size="large">
          Start new meeting
        </IconButton>
      </div>
      <div className={classes.banner}>
        <Card className={classes.centeredFlex} variant="outlined">
          <CardContent>
            {recordings && recordings.length ? (
              <h3>Recordings</h3>
            ) : (
              <h3>There are no recordings</h3>
            )}
          </CardContent>
          <CardActions>
            <div className={classes.root}>
              {recordings ? (
                <div className={classes.recording}>
                  <ul>
                    {recordings.map(recording => (
                      <li key={recording.id}>
                        Started at: {Date(recording.createdAt)}
                        {recording.status === 'available' ? (
                          <Button
                            color="inherit"
                            edge="start"
                            target="_blank"
                            href={recording.url}
                          >
                            <GetAppIcon />
                          </Button>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
