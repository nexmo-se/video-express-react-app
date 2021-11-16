import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  list: {
    width: 350,
    margin: 'auto',
  },
  //   root: {
  //     margin: auto
  //   },
  button: {
    margin: theme.spacing(1),
  },

  qrCode: {
    margin: 'auto',
  },

  toolTip: {
    position: 'absolute',
    left: '0',
    bottom: '10px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    margin: 'auto',
    marginTop: '6px',
  },
  versionLabel: {
    marginLeft: '15px',
  },
  listItem: {
    paddingTop: '2px',
  },
  sessionLabel: {
    wordBreak: 'break-word',
  },
}));
