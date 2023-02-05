import { useEffect, useState } from 'react'
import { Rating } from '../../types/Rating'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import useSocket from '../../hooks/useSocket'
import { Box, Collapse, Paper, Slide, Stack, Typography, Zoom } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'
import RatingListItem from './RatingListItem'
import api from '../../lib/api'



const RatingList = ( { size = 4 }: { size?: number } ) => {

    const [ ratings, setRatings ] = useState<Rating[]>( [] )

    useEffect( () => {
        api.get( 'ratings/pages' ).then( res => {
            setRatings( res.data.slice( 0, size ) )
            console.log( 'Ratings fetched' )
        } )
    }, [] )

    const handleRatings = ( { rating }: { rating: Rating } ) => {
        console.log( 'New Rating:', rating )
        console.log( rating.id, ratings.map( rate => rate.id ) )
        setRatings( ratings => [ rating, ...ratings.filter( oldRating => oldRating.id !== rating.id ) ] )
    }

    useSocket( { channel: 'pages', event: 'page.rated', callBack: handleRatings } )

    return ( <Box sx={{ maxHeight: '100vh', overflowY: 'scroll' }}>
        <Typography variant={'h5'}>Last Ratings</Typography>
        <Box>
            <TransitionGroup>
                {ratings.map( rating => <Slide direction={'left'} key={rating.id}>
                    <Box>
                        <RatingListItem {...rating} key={rating.id}/>
                    </Box>
                </Slide> )}
            </TransitionGroup>
        </Box>
    </Box> )

}
export default RatingList