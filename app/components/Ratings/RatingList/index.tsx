import { Rating } from '../../../interfaces/RatingInterface'
import { Paper, Stack, Typography } from '@mui/material'
import RatingListItem from './components/RatingListItem'
import Divider from '@mui/material/Divider'



interface RatingListProps {
    ratings: Rating[]
}

const RatingList = ( { ratings }: RatingListProps ) => {

    return (
      <Paper>
          <Typography variant={'h4'} mb={3}>Recent Ratings</Typography>
          <Stack divider={<Divider/>}>
              {ratings.map( rating => <RatingListItem data={rating}/> )}
          </Stack>
      </Paper>
    )
}
export default RatingList