import { Box, Chip, CircularProgress, Paper, Stack, Typography } from '@mui/material'
import { Domain } from '../../../interfaces/DomainInterface'
import Favicon from '../Favicon'
import moment from 'moment'
import AverageRatings from '../../Ratings/AverageRatings'



interface DomainHeaderProps {
    domain: Domain,
}

const DomainHeader = ( { domain }: DomainHeaderProps ) => {
    return (
      <Box>
          <Paper>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                  <Stack direction={'row'} alignItems={'center'}>
                      <Favicon {...domain} size={60}/>
                      <Typography variant={'h3'}>{domain.name}</Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                      <Chip label={`Pages : ${domain.pages_count}`}/>
                      <AverageRatings rating={domain.rating}/>
                  </Stack>
                  <Box sx={{ opacity: .7 }}>
                      <Typography variant={'body2'}>Last Update:</Typography>
                      <Typography variant={'body2'}>{moment( domain.updated_at ).fromNow()}</Typography>
                  </Box>
              </Stack>
          </Paper>
      </Box>
    )
}
export default DomainHeader