import { Container, makeStyles } from "@material-ui/core"
import { ChevronRight, ExpandMore } from "@material-ui/icons"
import { TreeView } from "@material-ui/lab"

import FileTreeItem from "./FileTreeItem"

import { URL_GET_FILES } from "../../constants"
import useFetch from "../../hooks/useFetch"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  }
})

const FileTreeView = () => {
  const classes = useStyles();
  const { data, isPending, isError } = useFetch(URL_GET_FILES)

  const renderTree = (node) => (
    <FileTreeItem node={node}>
      {Array.isArray(node.contents) ? node.contents.map(nn => renderTree(nn)) : null}
    </FileTreeItem>
  )

  return (
    <Container>
      {isPending && <div>Loading...</div>}
      {isError && <div>{isError}</div>}
      {data &&
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
        >
          {data.listing.map(node => (
            renderTree(node)
          ))}
        </TreeView>
      }
    </Container>
  )
}

export default FileTreeView

