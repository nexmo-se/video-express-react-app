import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  centeredContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    textAlign: 'center'
  },
  centeredText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    color: '#ffffff'
  },
  devicesText: {
    fontSize: '36px',
    lineHeight: '1em'
  },
  devicesImages: {
    width: '100%',
    maxWidth: '350px'
  }
}));
