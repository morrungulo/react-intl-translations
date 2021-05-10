import { useState } from "react"
import { AppBar, Container, Drawer, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core"
import { Menu } from "@material-ui/icons"

import FileTreeView from "./filetree/FileTreeView"
import { DRAWER_WIDTH } from "../constants"

const useStyles = makeStyles(theme => {
  return {
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(1)
    },
    title: {
      flexGrow: 1
    },
    container: {
      width: DRAWER_WIDTH,
      padding: theme.spacing(1)
    }
  }
})

const Navbar = () => {
  const title = 'JSON Editor'
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const toggleDrawer = () => setOpen(prevState => !prevState)

  return (
    <div className={classes.root}>

      {/* toolbar */}
      <AppBar
        position="static"
        elevation={0}>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            edge="start"
            color="inherit"
            className={classes.menuButton}
            aria-label="open drawer"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>{title}</Typography>
        </Toolbar>

        {/* drawer */}
        <Drawer
          open={open}
          onClose={toggleDrawer}
          anchor="left"
        >
          <Container className={classes.container}>
            <Typography variant="h6" gutterBottom noWrap>
              Directory Listing
            </Typography>
            <FileTreeView />
          </Container>
        </Drawer>

      </AppBar>
    </div>
  );
}

export default Navbar