import { Chip, IconButton, Stack } from '@mui/material'
import { Refresh } from '@mui/icons-material'
import RatingStack from '../rating/RatingStack'
import { useContext } from 'react'
import { DomainContext } from './DomainWrapper'



const DomainRatings = () => {
    const { rating } = useContext( DomainContext )

    return ( <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} justifyContent={{ lg: 'center' }} spacing={1}>
        <RatingStack data={rating} options={{ withArrow: false }}/>
        <IconButton size={'small'} sx={{ opacity: .5 }}>
            <Refresh/>
        </IconButton>
    </Stack> )
}
export default DomainRatings