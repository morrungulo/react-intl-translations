import { IconButton, Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const Notify = ({ open, message, close }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      message={message}
      onClose={close}
      autoHideDuration={3000}
      action={
        <IconButton size="small" aria-label="close" color="secondary" onClick={close}>
          <Close fontSize="small" />
        </IconButton>
      }
    />
  )
}

export default Notify;