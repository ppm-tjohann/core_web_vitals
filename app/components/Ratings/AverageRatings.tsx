import { Chip, CircularProgress, Stack } from '@mui/material'
import { Rating } from '../../interfaces/RatingInterface'
import Ratings from './index'



export type RatingVariants = 'small' | 'medium'

interface DefaultRatingProps {
    rating: Rating | null
    variant?: RatingVariants
    spacing?: number
}

const AverageRatings = ( { rating, spacing = 1, variant = 'medium' }: DefaultRatingProps ) => {

    if ( rating === null )
        return (
          <Stack spacing={spacing} direction={'row'}>
              <Chip icon={<CircularProgress size={15}/>} label={variant === 'medium' ? 'performance' : 'P'}/>
              <Chip icon={<CircularProgress size={15}/>} label={variant === 'medium' ? 'seo' : 'S'}/>
              <Chip icon={<CircularProgress size={15}/>} label={variant === 'medium' ? 'accessibility' : 'A'}/>
          </Stack>
        )
    return <Ratings data={rating}/>

}
export default AverageRatings