import { ChangeEvent, MouseEvent, createContext, ReactNode, useEffect, useState, useContext } from 'react'
import { AddDomainRequest, BaseDomain } from '../../../interfaces/DomainInterface'
import { DomainHandler } from '../../../lib/api'
import errorHandler from '../../../lib/errorHandler'
import { UiMessagesContext } from '../../UiMessages/UiMessagesProvider'
import useDomain from '../../../hooks/useDomain'



interface AddDomainContext {
    values: BaseDomain,
    errors: { [key: string]: string },
    loading: boolean,
    handleChange: ( key: keyof BaseDomain ) => ( event: ChangeEvent<HTMLInputElement> ) => void,
    handleSubmit: ( event: MouseEvent<HTMLButtonElement> ) => {}
}

export const AddDomainContext = createContext( {} as AddDomainContext )

interface AddDomainProviderProps {
    children: ReactNode,
}

const AddDomainProvider = ( { children }: AddDomainProviderProps ) => {

    const DEFAULT_VALUES = {
        name: '', url: '', favicon: '', sitemap: '',
    }

    const [ values, setValues ] = useState<BaseDomain>( DEFAULT_VALUES )
    const [ errors, setErrors ] = useState<{ [key: string]: string }>( {} )
    const { setSuccessMessage, setErrorMessage } = useContext( UiMessagesContext )
    const { loadingStore: loading, handleDomainAdd } = useDomain()

    useEffect( () => {
        console.log( 'Errors changed: ', errors )
    }, [ errors ] )

    const handleChange = ( key: keyof BaseDomain ) => ( event: ChangeEvent<HTMLInputElement> ) => {
        setValues( {
            ...values,
            [key]: event.target.value,
        } )
    }

    const handleSubmit = async ( event: MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault()
        const { errors } = await handleDomainAdd( values )
        if ( errors ) {
            setErrors( errors )
        }

    }

    return ( <AddDomainContext.Provider value={{
        values, handleChange, loading,
        handleSubmit, errors,
    }}>
        {children}
    </AddDomainContext.Provider> )
}
export default AddDomainProvider