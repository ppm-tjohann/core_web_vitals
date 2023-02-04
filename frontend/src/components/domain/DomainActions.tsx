import FlexBox from '../shared/FlexBox'
import { Chip, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { useContext } from 'react'
import { DomainContext } from './DomainWrapper'



const DomainActions = () => {
    const theme = useTheme()
    const { expanded, toggleList } = useContext( DomainContext )

    return (
      <Stack alignItems={'flex-end'}>
          <IconButton
            onClick={toggleList}
            sx={{
                transition: `transform ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
                transform: `rotate(${expanded ? 180 : 0}deg)`,
            }}><ExpandMore/></IconButton>
      </Stack>
    )
}
export default DomainActions