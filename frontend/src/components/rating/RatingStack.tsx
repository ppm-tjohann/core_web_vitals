import { Chip, Stack } from '@mui/material'
import { Rating } from '../../types/Rating'



interface RatingStack {
    data?: Rating | null,
    options?: {}
}

const RatingStack = ( { data }: RatingStack ) => {

    const getColor = ( rating: number ): 'default' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning' => {
        const breakpoints = [ 25, 50, 85 ]
        if ( rating < breakpoints[0] )
            return 'error'
        if ( rating < breakpoints[1] )
            return 'warning'
        if ( rating < breakpoints[2] )
            return 'info'

        return 'success'
    }

    if ( !data ) {
        return (
          <Stack direction={'row'} spacing={1} sx={{ opacity: .5 }}>
              <Chip label={`P:00`}/>
              <Chip label={`S:00`}/>
              <Chip label={`A:00`}/>
          </Stack>
        )
    }

    return ( <Stack direction={'row'} spacing={1}>
        <Chip label={`P:${data.performance}`} color={getColor( data.performance )}/>
        <Chip label={`S:${data.seo}`} color={getColor( data.seo )}/>
        <Chip label={`A:${data.accessibility}`} color={getColor( data.accessibility )}/>
    </Stack> )
}
export default RatingStack