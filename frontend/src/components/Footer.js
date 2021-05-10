import { Container, makeStyles, Typography } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => {
  return {
    container: {
      backgroundColor: indigo[500],
      textAlign: 'center',
      padding: theme.spacing(2)
    },
    text: {
      color: theme.palette.primary.contrastText
    }
  }
})

const Footer = () => {
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.container}>
      <Typography
        variant="body2"
        className={classes.text}
      >
        Copyright &copy; Alexandre Lopes
      {' ' + new Date().getFullYear()}
      </Typography>
    </Container>
  );
}


export default Footer;