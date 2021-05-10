import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { FolderOpen } from "@material-ui/icons";
import { TreeItem } from "@material-ui/lab";

import { useFile } from '../../contexts/FileContext'

const useStyles = makeStyles(theme => {
  return {
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
    },
    labelText: {
      fontWeight: '300',
      flexGrow: 1
    }
  }
})

const FileTreeItem = ({ node, children }) => {
  const classes = useStyles()
  const { loadNode } = useFile()

  return (
    <TreeItem
      key={node.id}
      nodeId={node.name}
      label={
        <div className={classes.labelRoot}>
          <Typography variant="body2" className={classes.labelText}>
            {node.label}
          </Typography>
          {node.type === "f" &&
            <IconButton
              edge="start"
              size="small"
              color="inherit"
              aria-label="open file"
              onClick={() => loadNode(node)}
            >
              <FolderOpen style={{ fontSize: 18 }} />
            </IconButton>}
        </div>
      }
    >
      {children}
    </TreeItem>
  );
}

export default FileTreeItem;