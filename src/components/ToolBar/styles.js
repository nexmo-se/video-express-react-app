import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
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
    borderRadius: '25px',
  },
  toolbarButtons: {
    margin: theme.spacing(1),
    borderRadius: '5em',
    height: '50px',
    width: '50px',
    backgroundColor: '#32353A',
    color: '#fff',
  },
  disabledButton: {
    backgroundColor: theme.palette.activeButtons.red,
    '&:hover': {
      backgroundColor: theme.palette.activeButtons.red,
    },
  },
  activeButton: {
    backgroundColor: theme.palette.activeButtons.green,
    '&:hover': {
      backgroundColor: theme.palette.activeButtons.green,
    },
  },
  activeButtonIcon: {
    color: theme.palette.activeButtons.green,
  },
}));
