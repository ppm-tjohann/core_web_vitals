import { useEffect, useState } from 'react'
import api from '../../lib/api'
import InfoWrapper from './InfoWrapper'
import useSocket from '../../hooks/useSocket'



const RatingCount = () => {

    const [ loading, setLoading ] = useState( true )
    const [ count, setCount ] = useState( 0 )

    useEffect( () => {
        setLoading( true )
        api.get( 'ratings/today?fields[ratings]=id' ).then( res => {
            setCount( res.data.length )
            setLoading( false )
        } ).catch( e => {
            console.error( 'Fetching Pages Count failed' )
        } )
    }, [] )

    const handleCount = () => {
        console.log( 'Handling Count' )
        setCount( c => c++ )
    }

    return ( <InfoWrapper bgColor={'info.main'} headline={'Ratings Today'} info={count} loading={loading}/> )

}
export default RatingCount