import PropTypes from 'prop-types'
import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const drawerWidth = 240
// @ts-ignore
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    height: '100vh',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperOpen: {
    height: '100vh',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    height: '100vh',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(1) * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(1) * 9,
    },
  },
  hide: {
    display: 'none',
  },
}))

const DrawerComponent: React.FunctionComponent<{width: number}> = ({ children, width }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div style={{ boxSizing: 'content-box' }}>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        variant={'temporary'}
        onClose={() => {}}
        anchor={
          theme.direction === 'rtl' ? 'right' : 'left'
        }
        classes={{paper: classes.drawerPaper}}
        onOpen={() => {}}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
       open={true}>
        {children}
      </SwipeableDrawer>
    </div>
  )
}

export default DrawerComponent
