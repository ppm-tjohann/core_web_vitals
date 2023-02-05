import { useEffect, useState } from 'react'
import InfoWrapper from './InfoWrapper'
import api from '../../lib/api'



const PageCount = () => {

    const [ loading, setLoading ] = useState( true )
    const [ count, setCount ] = useState( 0 )

    useEffect( () => {
        setLoading( true )
        api.get( 'pages?fields[pages]=id' ).then( res => {
            setCount( res.data.length )
            setLoading( false )
        } ).catch( e => {
            console.error( 'Fetching Pages Count failed' )
        } )
    }, [] )

    return ( <InfoWrapper bgColor={'secondary.main'} headline={'Pages'} info={count} loading={loading}/> )

}
export default PageCount