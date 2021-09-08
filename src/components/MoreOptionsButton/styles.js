import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  infoButton: {
    position: 'absolute',
    left: '0',
    bottom: '10px',
    margin: theme.spacing(1),
    borderRadius: '5em',
    height: '50px',
    width: '50px',
    backgroundColor: '#32353A',
    color: '#fff'
  },
  paper: {
    overflowY: 'hidden'
  }
}));
