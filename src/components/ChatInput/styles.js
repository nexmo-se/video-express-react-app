import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
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
