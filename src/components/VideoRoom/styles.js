import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  callContainer: {
    height: '100vh',
    position: 'relative',
    backgroundColor: theme.palette.callBackground.main
  },
  roomContainer: {
    position: 'relative',
    height: 'calc(100vh - 90px)'
  },
  errorContainer: {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  toolbarContainer: {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  screenSharingContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 9
  },
  screenSharingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.4)',
    zIndex: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '22px',
    color: '#fff'
  }

  /* .roomContainer > .OT_subscriber {
    border-radius: 30px,
  }
  
  .roomContainer > .OT_publisher {
    bottom: 25px,
    right: 25px,
    position: absolute,
    border-radius: 10px,
    border-radius: 20px,
  } */
  /* roomContainer > .OT_screenshare {
    top: 25px,
    left: 25px,
    position: absolute,
    border-radius: 10px,
  } */
}));
