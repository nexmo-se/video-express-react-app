import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
export default makeStyles((theme: Theme) =>
  createStyles({
    chatContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '90vh',
      padding: '5px 15px',
      overflow: 'hidden'
    },
    chatInput: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    chatMessages: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 80%',
      overflowY: 'scroll',
      color: '#fff'
    }
  })
);
