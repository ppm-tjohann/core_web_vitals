import { Rating } from '../../interfaces/RatingInterface'
import { Chip, Stack } from '@mui/material'



interface RatingsProps {
    data: Rating
}

const Ratings = ( { data }: RatingsProps ) => {

    const getColor = ( value: number ) => {
        if ( value < 30 ) {
            return 'error'
        }
        if ( value < 70 )
            return 'warning'
        return 'success'
    }

    return (
      <Stack direction={'row'} spacing={3}>
          <Chip label={'P: ' + data.performance} color={getColor( data.performance )}/>
          <Chip label={'S: ' + data.seo} color={getColor( data.seo )}/>
          <Chip label={'A: ' + data.accessibility} color={getColor( data.accessibility )}/>
      </Stack>
    )
}
export default Ratings