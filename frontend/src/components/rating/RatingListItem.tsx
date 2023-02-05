import { Avatar, Box, Chip, Paper, Stack, Typography } from '@mui/material'
import { Rating } from '../../types/Rating'
import RatingStack from './RatingStack'
import moment from 'moment'



const RatingListItem = ( { ratable, updated_at, created_at, ...ratings }: Rating ) => {
    const ratableIsPage = ratable && 'domain' in ratable

    return (
      <Paper sx={{ my: 2, p: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', aligItems: 'center', justifyContent: 'space-between' }}>
              <Box my={2} sx={{ flexShrink: 1 }}>
                  {ratable && <Stack direction={'row'} alignItems={'center'}>
                      {'domain' in ratable && ratable.domain && <Avatar src={ratable.domain.favicon}/>}
                    <Box my={1}>
                        {ratableIsPage && ratable.domain && <>
                          <Typography variant={'body1'}>{ratable.domain.name}</Typography>
                          <Typography variant={'body2'} sx={{ opacity: .5, breakWord: 'anywhere' }}>{ratable.url.replace( ratable.domain.url, '' )}</Typography>
                        </>
                        }
                    </Box>
                  </Stack>}
              </Box>
              <Box my={2}><RatingStack data={ratings}/></Box>
              <Chip sx={{ my: 2 }} label={moment( created_at ).fromNow()}/>
          </Box>
      </Paper>
    )

}
export default RatingListItem