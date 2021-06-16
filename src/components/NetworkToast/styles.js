import { makeStyles } from '@material-ui/core/styles';
export default makeStyles({
  root: {
    top: '0',
    background: ({ networkStatus }) => {
      if (networkStatus === 'disconnected') return '#e25141';
      if (networkStatus === 'reconnecting') return '#f19c38';
      if (networkStatus === 'reconnected') return '#4caf50';
    },
    /* width: '100%', */
    justifyContent: 'center',
  },
  info: {
    top: '0',
    background: '#418be9',
    justifyContent: 'center',
  },
  action: {
    position: 'absolute',
    right: '0',
    paddingRight: '10px',
  },
  networkStatusIcons: {
    paddingRight: '10px',
  },
  snackBarContent: {
    display: 'flex',
    alignItems: 'flex-end',
  },
});
