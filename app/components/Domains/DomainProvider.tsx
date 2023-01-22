import { createContext, ReactNode } from 'react'
import { DomainHandler } from '../../lib/api'
import errorHandler from '../../lib/errorHandler'
import { Domain } from '../../interfaces/DomainInterface'



interface DomainContext {
    domains: Domain[],
    handleDelete: ( id: number ) => void,
}

export const DomainContext = createContext( {} as DomainContext )

interface DomainProviderProps {
    children: ReactNode,
    domains: Domain[],

}

const DomainProvider = ( { children, domains }: DomainProviderProps ) => {

    const handleDelete = async ( id: number ) => {
        try {
            await DomainHandler.delete( id )
        }
        catch ( e ) {
            errorHandler( e )
        }
    }

    return (
      <DomainContext.Provider value={{ domains, handleDelete }}>
          {children}
      </DomainContext.Provider>
    )
}
export default DomainProvider
