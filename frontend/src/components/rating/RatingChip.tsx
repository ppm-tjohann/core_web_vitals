import { Chip } from '@mui/material'
import { Rating } from '../../types/Rating'



interface options {
    withArrows?: boolean
}

interface RatingChip {
    label: keyof Rating
    rating: number
    context?: number
    size?: 'default' | 'large'
    options?: options
}

const RatingChip = ( { label, rating, context, size = 'default' }: RatingChip ) => {

    // const getRotation = ( label: keyof Rating ) => {
    //     if ( !context || !data ) {
    //         return 0
    //     }
    //     const activeRating = data[label] // 80
    //     const contextRating = context[label] // 60
    //
    //     const percentage = contextRating / activeRating
    //     return ( percentage * 450 )
    //
    // }

    const getColor = (): 'default' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning' => {
        const breakpoints = [ 25, 50, 85 ]
        if ( rating < breakpoints[0] )
            return 'error'
        if ( rating < breakpoints[1] )
            return 'warning'
        if ( rating < breakpoints[2] )
            return 'info'

        return 'success'
    }

    const getName = () => {
        if ( size === 'large' )
            return label
        switch ( label ) {
            case 'performance':
                return 'P'
            case 'seo':
                return 'S'
            case 'accessibility':
                return 'A'
        }
    }

    return ( <Chip label={`${getName()}: ${rating}`} color={getColor()}/> )
}
export default RatingChip