import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
export default makeStyles((theme: Theme) =>
  createStyles({
    wrapForm: {
      display: 'flex',
      width: '95%',
    },
    wrapText: {
      width: '100%'
    },
    button: {
      //margin: theme.spacing(1),
    }
  })
);
