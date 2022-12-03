import {Box, Grid, useTheme} from '@mui/material'
import {TransitionGroup} from 'react-transition-group'

const Content = ({children}) => {
  const theme = useTheme()
  return (<Box
      className={'content'}
      sx={{
        background: theme.palette.mode === 'dark' ?
            theme.palette.grey['900'] :
            theme.palette.grey['100'],
        position: 'relative',
        width: 'calc(100% - 64px)',
        height: 'calc(100vh - 64px)',
        ml: '64px',
        mt: '64px',
        p: 6,
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'scroll',
      }}>
    <Box sx={{maxWidth: 2000}}>
      <TransitionGroup>
        {children}

      </TransitionGroup>
    </Box>
  </Box>)
}

export default Content