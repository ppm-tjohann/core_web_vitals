import { Chip, IconButton, Stack } from '@mui/material'
import { Refresh } from '@mui/icons-material'
import RatingStack from '../rating/RatingStack'



const DomainRatings = () => {
    return ( <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} justifyContent={{ lg: 'center' }} spacing={1}>
        <RatingStack/>
        <IconButton size={'small'} sx={{ opacity: .5 }}>
            <Refresh/>
        </IconButton>
    </Stack> )
}
export default DomainRatings