import { Box, Chip, Collapse, Grid, IconButton, Stack, Typography } from '@mui/material'

import { useState } from 'react'
import PageList from './/PageList'
import DomainInfo from '../domain/DomainInfo'
import DomainPageInfo from '../domain/DomainPageInfo'
import DomainRatings from '../domain/DomainRatings'
import DomainActions from '../domain/DomainActions'
import { ExpandMore } from '@mui/icons-material'
import FlexBox from '../shared/FlexBox'
import RatingStack from '../rating/RatingStack'



const PageListItem = () => {

    const [ expanded, setExpanded ] = useState( false )

    const toggleList = () => {
        setExpanded( e => !e )
    }

    return (
      <Box sx={{ p: 2 }}>
          <Stack spacing={{ xs: 0, sm: 2 }} direction={'row'} alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'}>
              <Stack my={1} direction={{ xs: 'column', sm: 'row' }} alignItems={'center'} justifyContent={{ xs: 'space-between', lg: 'flex-start' }}
                     flexGrow={1}>
                  <Typography variant={'body1'}> https://www.waldkliniken-eisenberg/home</Typography>
                  <Typography variant={'body2'} sx={{ opacity: .5 }}><Chip label={'5 minutes ago'}/></Typography>
              </Stack>

              <Stack my={1} direction={'row'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'space-between'} flexGrow={1}>
                  <RatingStack/>
                  <Box><IconButton><ExpandMore/></IconButton></Box>
              </Stack>
          </Stack>
      </Box>
    )
}
export default PageListItem