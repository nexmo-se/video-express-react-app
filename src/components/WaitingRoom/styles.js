import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { Height } from '@material-ui/icons';
export default makeStyles((theme) => ({
  waitingRoomContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    display: 'flex',
    flexDirection: 'column',
    transform: 'translate(-50%, -50%)',
    backgroundColor: blueGrey[100],
    padding: '25px',
    borderRadius: 5,
    width: '400px'
    // height: '90%',
  },
  formControl: {
    width: '100%',
  },
  mediaSources: {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  waitingRoomVideoPreview: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0px',
    minHeight: '200px',
  },
  deviceContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 5px',
  },
  deviceSettings: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  networkTestContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 5px',
  },
  flex: {
    display: 'flex',
  },
  root: {
    width: '20%',
  },
}));
