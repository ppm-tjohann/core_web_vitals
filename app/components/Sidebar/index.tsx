import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ReactNode } from 'react'
import { Dashboard, Language, Menu, Pageview } from '@mui/icons-material'
import { useRouter } from 'next/router'



const drawerWidth = 240

const openedMixin = ( theme: Theme ): CSSObject => ( {
    width: drawerWidth,
    transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    } ),
    overflowX: 'hidden',
} )

const closedMixin = ( theme: Theme ): CSSObject => ( {
    transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    } ),
    overflowX: 'hidden',
    width: `calc(${theme.spacing( 7 )} + 1px)`,
    [theme.breakpoints.up( 'sm' )]: {
        width: `calc(${theme.spacing( 8 )} + 1px)`,
    },
} )

const DrawerHeader = styled( 'div' )( ( { theme } ) => ( {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing( 0, 1 ),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
} ) )

const Drawer = styled( MuiDrawer, { shouldForwardProp: ( prop ) => prop !== 'open' } )(
  ( { theme, open } ) => ( {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...( open && {
          ...openedMixin( theme ),
          '& .MuiDrawer-paper': openedMixin( theme ),
      } ),
      ...( !open && {
          ...closedMixin( theme ),
          '& .MuiDrawer-paper': closedMixin( theme ),
      } ),
  } ),
)

interface SidebarProps {
    children: ReactNode
}

const Sidebar = ( { children }: SidebarProps ) => {
    const theme = useTheme()
    const router = useRouter()
    const [ open, setOpen ] = React.useState( false )
    const menuLinks = [
        { name: 'Dashboard', link: '/', icon: <Dashboard/> },
        { name: 'Domains', link: '/domains', icon: <Language/> },
        { name: 'Pages', link: '/pages', icon: <Pageview/> },

    ]

    const handleDrawerOpen = () => {
        setOpen( true )
    }

    const handleDrawerClose = () => {
        setOpen( false )
    }

    const toggleDrawer = () => {
        setOpen( o => !o )
    }

    const handleClick = ( slug: string ) => () => {
        router.push( slug )
    }

    return (
      <Box sx={{ display: 'flex' }}>
          <Drawer variant="permanent" open={open} sx={{
              py: 3,
              '.MuiPaper-root': {
                  p: 0,
              },
          }}>
              <Divider/>
              <Box sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                  <IconButton onClick={toggleDrawer} sx={{ mt: 6 }}><Menu/></IconButton>
              </Box>
              <List>
                  {menuLinks.map( ( menuItem, index ) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={handleClick( menuItem.link )}>
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
                              }}
                            >
                                {menuItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={menuItem.name} sx={{ opacity: open ? 1 : 0 }}/>
                        </ListItemButton>
                    </ListItem>
                  ) )}
              </List>

          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              {children}
          </Box>
      </Box>
    )

}

export default Sidebar
