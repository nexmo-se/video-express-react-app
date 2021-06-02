import { useEffect } from 'react';
import { fetchRecordings } from '../../api/fetchRecording';
import { useParams } from 'react-router';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import styles from './styles';

export default function EndCall() {
  const classes = styles();
  const { sessionId } = useParams();
  useEffect(() => {
    try {
      fetchRecordings(sessionId).then(data => {
        // setCredentials({ apikey, sessionId, token });
        console.log(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className={classes.banner}>
      <Card className={classes.centeredFlex} variant="outlined">
        <CardContent>
          <p>Recordings</p>
          {/* <p ref={urlRef}>{window.location.href}</p> */}
        </CardContent>
        <CardActions>
          <div className={classes.root}>
            <Button
              edge="end"
              color="primary"
              variant="contained"
              style={{ marginLeft: '50px' }}
              // onClick={copyUrl}
            >
              Download recording
              {/* {open ? (
                <div className={classes.acCopySuccess}>Copied</div>
              ) : null} */}
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
