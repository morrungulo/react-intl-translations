import { useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { useFile } from "../contexts/FileContext";

import TranslationFileDetails from "./TranslationFileDetails";
import Notify from "./snackbars/Notify";

const useStyles = makeStyles(theme => {
  return {
    root: {
      padding: theme.spacing(2)
    },
    empty: {
      padding: theme.spacing(2)
    }
  }
})

const MainContainer = () => {
  const classes = useStyles()
  const { nodes } = useFile()

  // show / close notes
  const [note, setNote] = useState({ open: false, message: '' })
  const showNote = (message) => setNote({ open: true, message })
  const closeNote = () => setNote({ open: false, message: '' })

  return (
    <Container maxWidth='lg' className={classes.root}>

      {/* empty message */}
      {nodes.length === 0 &&
        <Alert severity='success'>
          <AlertTitle>No Files</AlertTitle>
          Select files to open from the drawer menu
        </Alert>
      }

      {/* translation files */}
      {nodes.length > 0 &&
        <Grid
          container
          spacing={3}
        >
          {nodes.map(item => (
            <Grid item key={item.node.id} xs={12} md={6}>
              <TranslationFileDetails node={item.node} data={item.data} notify={showNote} />
            </Grid>
          ))}
        </Grid>
      }

      {/* notification alert */}
      <Notify open={note.open} message={note.message} close={closeNote} />

    </Container>
  );
}

export default MainContainer;