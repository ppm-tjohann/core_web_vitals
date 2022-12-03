import * as React from 'react'
import {styled, useTheme} from '@mui/material/styles'

import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'

import CssBaseline from '@mui/material/CssBaseline'

import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import {
  Accessible, DarkMode, Dashboard, LightMode, Speed, TravelExplore, Web,
} from '@mui/icons-material'
import {
  Button,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {useHref, useNavigate} from 'react-router'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth, transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }), overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1), // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }), ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer,
                      {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box', ...(open && {
        ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme),
      }), ...(!open && {
        ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }))

export default function MiniDrawer() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const activeHref = useHref()

  const navigation = [
    {name: 'Dashboard', icon: <Dashboard/>, href: '/'},
    {name: 'Domains', icon: <Web/>, href: '/domains'},
    {name: 'Performance', icon: <Speed/>, href: '/performance'},
    {name: 'SEO', icon: <TravelExplore/>, href: '/seo'},
    {name: 'Accessibility', icon: <Accessible/>, href: '/accessibility'},

  ]

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleClick = href => event => {
    console.log('CLICK', href)
    navigate(href)
    setOpen(false)
  }

  return (<Box sx={{display: 'flex'}}>
    <CssBaseline/>
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5, ...(open && {display: 'none'}),
            }}
        >
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" noWrap component="div"
                    sx={{flexGrow: 1}}>Dashboard</Typography>
        <Button color={'inherit'} endIcon={theme.palette.mode === 'dark' ?
            <DarkMode/> :
            <LightMode/>}>
          Color-Mode
        </Button>
      </Toolbar>
    </AppBar>
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
        </IconButton>
      </DrawerHeader>
      <Divider/>
      <List>
        {navigation.map(nav => (
            <ListItem key={nav.name} disablePadding sx={{display: 'block'}}
                      sx={{
                        transition: `background-color 500ms ease-in-out`,
                        backgroundColor: activeHref === nav.href ?
                            'primary.main' :
                            'inherit',
                      }}
                      onClick={handleClick(nav.href)}>
              <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
              >
                <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: activeHref === nav.href ? '#fff' : 'inherit',
                    }}
                >
                  {nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav.name} sx={{
                  opacity: open ? 1 : 0,
                  color: activeHref === nav.href ? '#fff' : 'inherit',
                }}/>
              </ListItemButton>
            </ListItem>))}
      </List>
    </Drawer>

  </Box>)
}
