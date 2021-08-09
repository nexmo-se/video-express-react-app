import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
export default makeStyles((theme: Theme) =>
  createStyles({
    wrapForm: {
      display: 'flex',
      justifyContent: 'center',
      width: '95%',
      margin: `${theme.spacing(0)} auto`
    },
    wrapText: {
      width: '100%'
    },
    button: {
      //margin: theme.spacing(1),
    }
  })
);
