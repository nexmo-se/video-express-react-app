import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
export default makeStyles((theme: Theme) =>
  createStyles({
    chatInput: {
      bottom: '0',
      position: 'absolute',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'absolute',
      bottom: 25,
      left: 0,
      right: 0
    }
  })
);
