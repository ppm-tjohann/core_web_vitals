import { useEffect, useState } from 'react'
import InfoWrapper from './InfoWrapper'
import api from '../../lib/api'



const DomainCount = () => {
    const [ loading, setLoading ] = useState( true )
    const [ count, setCount ] = useState( 0 )

    useEffect( () => {
        api.get( 'domain?fields[domains]=id' ).then( res => {
            setCount( res.data.length )
            setLoading( false )
        } )
    }, [] )

    return (
      <InfoWrapper bgColor={'primary.main'} info={count} headline={'Domains'} loading={loading}/>
    )

}
export default DomainCount