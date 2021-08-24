import { makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
export default makeStyles(theme => ({
  mine: {
    left: '0'
    // position: 'absolute'
  },
  others: {
    right: '0'
    // position: 'absolute'
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  chatAvatar: {
    display: 'flex'
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    padding: '10px',
    margin: '5px',
    backgroundColor: theme.palette.primary.main,
    overflowY: 'scroll'
  },
  iconChat: {
    marginRight: '5px'
  },
  time: {
    position: 'absolute',
    right: '40px'
  }
}));
