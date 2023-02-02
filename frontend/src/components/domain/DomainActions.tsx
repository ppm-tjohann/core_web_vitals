import FlexBox from '../shared/FlexBox'
import { Chip, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'



interface DomainActions {
    onClick: () => any
    expanded: boolean
}

const DomainActions = ( { expanded, onClick: handleClick }: DomainActions ) => {
    const theme = useTheme()
    const breakpoint = useMediaQuery( theme.breakpoints.up( 'md' ) )

    return (
      <Stack alignItems={'flex-end'}>
          {breakpoint && <Typography variant={'caption'} sx={{ textAlign: 'right', mr: 1.25, opacity: .5 }}>5 minutes ago</Typography>}
          <IconButton sx={{

              transition: `transform ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
              transform: `rotate(${expanded ? 180 : 0}deg)`,
          }}
                      onClick={handleClick}><ExpandMore/></IconButton>
      </Stack>
    )
}
export default DomainActions