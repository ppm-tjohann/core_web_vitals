import { createContext, ReactNode, useState } from 'react'
import { Domain } from '../../types/Domain'
import { Box, Collapse } from '@mui/material'
import PageList from '../page/PageList'
import useSocket from '../../hooks/useSocket'
import api from '../../lib/api'



export type DomainContext = Domain & {
    expanded: boolean
    toggleList: () => any
    refreshRating: () => any
    loadingRating: boolean
}

export const DomainContext = createContext( {} as DomainContext )

interface DomainWrapper {
    data: Domain
    children: ReactNode
}

const DomainWrapper = ( { data: domain, children }: DomainWrapper ) => {

    const [ expanded, setExpanded ] = useState( false )
    const [ pages_count, setPagesCount ] = useState( domain.pages_count )
    const [ sitemapFound, setSitemap ] = useState( domain.sitemapFound )
    const [ rating, setRating ] = useState( domain.rating )
    const [ loadingRating, setLoadingR ] = useState( false )

    const handleSocketSitemap = ( { domain }: { domain: Domain } ) => {
        setPagesCount( domain.pages_count )
        setSitemap( domain.sitemapFound )
    }
    const handleSocketRating = ( { domain }: { domain: Domain } ) => {
        console.log( 'New Rating : ', domain )
        if ( domain.rating )
            setRating( domain.rating )
    }

    const handleRatings = async () => {
        setLoadingR( true )
        try {
            const { data: ratings } = await api.get( `domain/${domain.id}/average` )
            setRating( ratings )
            setLoadingR( false )
        }
        catch ( e ) {
            console.error( 'Updating Ratings failed :', e )
            setLoadingR( false )
        }
    }

    useSocket( { channel: 'domains', event: `domain.sitemap.${domain.id}`, callBack: handleSocketSitemap } )
    useSocket( { channel: 'domains', event: `domain.rating.${domain.id}`, callBack: handleSocketRating } )

    const toggleList = () => {
        setExpanded( e => !e )
    }

    // Todo integrate Socket for Sm and Pages Count
    // Todo integrate Socket for defaultRatings

    return (
      <DomainContext.Provider value={{ ...domain, pages_count, sitemapFound, rating, expanded, toggleList, refreshRating: handleRatings, loadingRating }}>
          <>
              <Box sx={{ cursor: 'pointer' }}>{children}</Box>
              <Collapse in={expanded} mountOnEnter unmountOnExit>
                  <PageList/>
              </Collapse>
          </>
      </DomainContext.Provider>
    )

}
export default DomainWrapper