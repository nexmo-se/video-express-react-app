import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  banner: {
    zIndex: 1,
    position: 'absolute',
    top: '40%',
    right: '10%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'black'
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
