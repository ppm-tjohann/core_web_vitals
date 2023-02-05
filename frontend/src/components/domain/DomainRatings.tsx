import { Chip, CircularProgress, IconButton, Stack } from '@mui/material'
import { Refresh } from '@mui/icons-material'
import RatingStack from '../rating/RatingStack'
import { useContext } from 'react'
import { DomainContext } from './DomainWrapper'



const DomainRatings = () => {
    const { rating, loadingRating, refreshRating } = useContext( DomainContext )

    return ( <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} justifyContent={{ lg: 'center' }} spacing={1}>
        <RatingStack data={rating} options={{ withArrow: false }}/>

        <IconButton size={'small'} sx={{ opacity: .5 }} onClick={refreshRating} disabled={loadingRating}>
            {loadingRating ? <CircularProgress size={20}/> : <Refresh/>}
        </IconButton>
    </Stack> )
}
export default DomainRatings