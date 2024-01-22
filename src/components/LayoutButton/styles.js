import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(theme => ({
  choosen: {
    backgroundColor: theme.palette.primary.main,
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}));
