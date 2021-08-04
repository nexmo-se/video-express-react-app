import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  toolbarContainer: {
    backgroundColor: theme.palette.toolbarBackground.main,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '90px',
    margin: theme.spacing(2),
    borderRadius: '25px'
  },
  paper: {
    position: 'absolute',
    display: 'flex',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  toolbarMobileContainer: {
    backgroundColor: theme.palette.toolbarBackground.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    margin: theme.spacing(2),
    borderRadius: '25px',
  },
  toolbarButtons: {
    margin: theme.spacing(1),
    borderRadius: '5em',
    backgroundColor: '#32353A',
    color: '#fff'
  },
  arrowButton: {
    borderRadius: '5em',
    height: '50px',
    width: '50px',
    backgroundColor: '#32353A',
    color: '#fff'
  },
  infoButton: {
    position: 'absolute',
    left: '0',
    margin: theme.spacing(1),
    borderRadius: '5em',
    height: '50px',
    width: '50px',
    backgroundColor: '#32353A',
    color: '#fff'
  },
  groupButton: {
    margin: '8px'
  },
  disabledButton: {
    backgroundColor: theme.palette.activeButtons.red,
    '&:hover': {
      backgroundColor: theme.palette.activeButtons.red
    }
  },
  activeButton: {
    backgroundColor: theme.palette.activeButtons.green,
    '&:hover': {
      backgroundColor: theme.palette.activeButtons.green
    }
  },
  activeButtonIcon: {
    color: theme.palette.activeButtons.green
  }
}));
