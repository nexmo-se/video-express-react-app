import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  banner: {
    zIndex: 1,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  acCopySuccess: {
    position: 'absolute',
    backgroundColor: '#131415',
    color: '#fff',
    top: '-45px',
    left: '-28px',
    fontSize: '0.8rem',
    fontWeight: 600,
    padding: '6px 12px',
    borderRadius: '6px',
    zIndex: 1,
  },
  root: {
    minWidth: 275,
    margin: 'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'transparent',
    color: '#fff',
    border: 'none',
  },
  textField: {
    borderColor: '#fff',
    color: '#fff',
  },
}));
