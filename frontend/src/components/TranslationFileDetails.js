import { useState } from "react";
import { Avatar, Box, Card, CardContent, CardHeader, makeStyles, Typography } from "@material-ui/core";
import { Delete, Save } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import { JsonEditor } from 'react-json-edit'

import { useFile } from "../contexts/FileContext";
import TooltippedIconButton from "./TooltippedIconButton";
import SaveDiscardDialog from "./dialogs/SaveDiscardDialog";

const useStyles = makeStyles(theme => {
  return {
    root: {
      maxWidth: 600
    },
    avatar: {
      backgroundColor: theme.palette.secondary.light,
    },
    buttons: {
      display: 'flex'
    }
  }
})

const TranslationFileDetails = ({ node, data, notify }) => {
  const classes = useStyles()
  const [modified, setModified] = useState(false)
  const [jsondata, setJsonData] = useState(data)
  const [dialog, setDialog] = useState(false)
  const { saveNode, removeNode } = useFile()

  const handleSaveAndDiscard = () => {
    notify(`Saving ${node.name} and discarting...`)
    saveNode(node, jsondata)
    removeNode(node)
    handleCloseDialog()
  }

  const handleDiscard = () => {
    notify(`Discarting ${node.name}...`)
    removeNode(node)
    handleCloseDialog()
  }

  const handleCloseDialog = () => {
    setDialog(false)
  }

  const handleRemove = () => {
    if (!modified) {
      notify(`Removing ${node.name}...`)
      return removeNode(node)
    }
    setDialog(true)
  }

  const handleSave = () => {
    if (modified) {
      notify(`Saving ${node.name} file...`)
      saveNode(node, jsondata)
      setModified(false)
    }
  }

  const propagateChanges = (changes) => {
    setJsonData(changes)
    setModified(true)
  }

  return (
    <div>
      <Card className={classes.root} variant='outlined'>

        <CardHeader
          avatar={
            <Avatar aria-label="file" className={classes.avatar}>
              {node.name.slice(1, 3).toLowerCase()}
            </Avatar>
          }
          title={
            <Typography variant='h6'>
              {node.name}
            </Typography>
          }
          action={
            <Box className={classes.buttons}>

              {/* add modified info */}
              {modified && <Alert severity='info'>Modified</Alert>}

              {/* save button */}
              <TooltippedIconButton title="Save" action={handleSave} icon={<Save />} disabled={!modified} />
              <TooltippedIconButton title="Remove" action={handleRemove} icon={<Delete />} />

            </Box>
          }
        />

        < CardContent >
          <JsonEditor tableLike={true} value={jsondata} propagateChanges={propagateChanges} />
        </CardContent >
      </Card >

      {/* save / discard dialog */}
      <SaveDiscardDialog open={dialog} discard={handleDiscard} saveAndDiscard={handleSaveAndDiscard} cancel={handleCloseDialog} />

    </div>
  );
}

export default TranslationFileDetails;