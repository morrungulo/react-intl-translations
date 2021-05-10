import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog } from "@material-ui/core"

const SaveDiscardDialog = ({ open, discard, saveAndDiscard, cancel }) => {
  return (
    <Dialog
      open={open}
      onClose={cancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Remove translation file?
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This translation file has been modified and not saved.
          This means discarding this file will cause all changes to be lost.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={saveAndDiscard} color="primary" autoFocus>
          Save and Discard
        </Button>
        <Button onClick={discard} color="primary">
          Discard without Saving
        </Button>
        <Button onClick={cancel} color="secondary">
          Cancel
        </Button>
      </DialogActions>

    </Dialog>
  );
}

export default SaveDiscardDialog;