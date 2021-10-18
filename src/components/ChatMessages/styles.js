import { makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
export default makeStyles((theme) => ({
  mine: {
    left: '0',
    // position: 'absolute'
  },
  others: {
    right: '0',
    // position: 'absolute'
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  chatAvatar: {
    display: 'flex',
  },
  chatContent: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '20vw',

    // : 0;
    // white-space: pre-line;
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    padding: '10px',
    margin: '5px',
    backgroundColor: theme.palette.primary.main,
    overflowY: 'scroll',
  },
  myMessage: {
    background: '#fff',
    border: `2px solid ${theme.palette.primary.main}`,
  },

  iconChat: {
    marginRight: '5px',
  },
  time: {
    marginLeft: 'auto',
  },
}));
