import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  root: {
    width: '30%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  },
  card: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'transparent',
    color: '#fff',
    border: 'none'
  },
  textField: {
    borderColor: '#fff',
    color: '#fff',
    textAlign: 'center'
  },
  flexCentered: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  }
}));
