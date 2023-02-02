import { Box, Chip, Collapse, Grid, Stack, Typography } from '@mui/material'
import DomainRatings from './DomainRatings'
import DomainPageInfo from './DomainPageInfo'
import DomainInfo from './DomainInfo'
import DomainActions from './DomainActions'
import { useState } from 'react'
import PageList from '../page/PageList'



const DomainListItem = () => {

    const [ expanded, setExpanded ] = useState( false )

    const toggleList = () => {
        setExpanded( e => !e )
    }

    return (
      <Box sx={{ width: '100%' }}>
          <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} justifyContent={'space-between'} spacing={0}>
              <Stack my={1} direction={{ xs: 'column', sm: 'row' }} alignItems={'center'} justifyContent={{ xs: 'space-between', lg: 'flex-start' }}
                     flexGrow={1}>
                  <DomainInfo/>
                  <DomainPageInfo/>
              </Stack>
              <Stack my={1} direction={'row'} alignItems={'center'} justifyContent={'space-between'} flexGrow={1}>
                  <DomainRatings/>
                  <DomainActions onClick={toggleList} expanded={expanded}/>
              </Stack>
          </Stack>
          <Collapse in={expanded} mountOnEnter unmountOnExit>
              <PageList/>
          </Collapse>

      </Box>
    )
}
export default DomainListItem