import { Rating } from '../../../../interfaces/RatingInterface'
import { Box, Stack, Typography } from '@mui/material'
import Ratings from '../../index'
import moment from 'moment'



interface RatingListItemProps {
    data: Rating
}

const RatingListItem = ( { data }: RatingListItemProps ) => {

    console.log( 'Rating :', data )

    return (
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Stack spacing={1}>
              <Typography variant={'body2'}>{data.ratable.url}</Typography>
              <Typography variant={'body2'} sx={{ opacity: .7 }}>{moment( data.created_at ).fromNow()}</Typography>
          </Stack>
          <Ratings data={data}/>
      </Stack>
    )
}
export default RatingListItem