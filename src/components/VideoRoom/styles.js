import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  roomContainer: {
    height: '100vh',
    position: 'relative',
  },
  callContainer: {
    height: '100vh',
    position: 'relative',
  },
  toolbarContainer: {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

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
