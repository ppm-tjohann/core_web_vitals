import { useContext, useState } from 'react'
import { AddDomainRequest, BaseDomain } from '../interfaces/DomainInterface'
import { DomainHandler } from '../lib/api'
import errorHandler from '../lib/errorHandler'
import { UiMessagesContext } from '../components/UiMessages/UiMessagesProvider'



const useDomain = () => {

    const [ loading, setLoading ] = useState( false )
    const [ loadingStore, setLoadingStore ] = useState( false )
    const { setErrorMessage, setSuccessMessage } = useContext( UiMessagesContext )

    const handleDomainAdd = async ( data: BaseDomain ) => {
        setLoadingStore( true )
        let errors = null
        try {
            AddDomainRequest.parse( data )
            const { data: domain } = await DomainHandler.store( data )
            setSuccessMessage( { title: 'New Domain Created', msg: `${domain.name} has been created – ${domain.pagesFound} pages have been found` } )
            setLoadingStore( false )
            return { domain }
        }
        catch ( e ) {
            errors = errorHandler( e ).errors
            setErrorMessage( { title: `Adding Domain ${data.name} failed` } )
        }
        setLoadingStore( false )
        return { errors }

    }

    const handleDomainUpdate = async ( id: number, domain: BaseDomain ) => {
        try {
            setLoading( true )
            await DomainHandler.update( id, domain )
            setLoading( false )
            setSuccessMessage( { title: 'Domain updated', msg: `Domain ${domain.name} updated` } )

        }
        catch ( e ) {
            const { errors } = errorHandler( e )
            if ( errors ) {
                return errors
            }
            setErrorMessage( { title: 'Domain update failed' } )
        }
    }

    const handleDomainDelete = async ( id: number ) => {
        try {
            setLoading( true )
            await DomainHandler.delete( id )
            setLoading( false )
            setSuccessMessage( { title: `Domain deleted` } )
        }
        catch ( e ) {
            const { errors } = errorHandler( e )
            if ( errors ) return errors
            setErrorMessage( { title: 'Deleting Domain failed' } )
        }
    }

    return {
        handleDomainUpdate, handleDomainDelete,
        handleDomainAdd,
        loading, loadingStore,
    }

}
export default useDomain