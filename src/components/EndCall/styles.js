import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  banner: {
    zIndex: 1,
    // flexGrow: 0.1,
    margin: '200px',
    height: '100px',
    width: '50%',
    // position: 'absolute'
    alignItems: 'center',
    borderRadius: '30px',
    backgroundColor: 'black'
  },
  container: {
    ['@media (min-width:768px)']: {
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center'
  },
  new__meeting: {
    color: 'rgb(43,158,250)'
  },

  meetingInfo: {
    margin: '100px',
    width: '50%',
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
    color: 'white',
    borderRadius: '30px'
  }
}));
