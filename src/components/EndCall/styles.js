import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  banner: {
    zIndex: 1,
    flexGrow: 0.1,
    margin: '100px',
    height: '100px',
    // position: 'absolute'
    alignItems: 'center',
    // top: '40%',
    // right: '10%',
    // transform: 'translate(-50%, -50%)',
    backgroundColor: 'black'
  },
  container: {
    display: 'flex'
    // flexDirection: 'row'
  },

  meetingInfo: {
    margin: '100px',
    flexGrow: 1.2,
    height: '100px',
    color: 'white'
  },
  recording: {
    display: 'flex',
    flexDirection: 'row'
  },
  root: {
    minWidth: 275,
    margin: 'auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  centeredFlex: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white'
  }
}));
