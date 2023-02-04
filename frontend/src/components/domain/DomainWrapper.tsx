import { createContext, ReactNode, useState } from 'react'
import { Domain } from '../../types/Domain'
import { Box, Collapse } from '@mui/material'
import PageList from '../page/PageList'



export type DomainContext = Domain & {
    expanded: boolean
    toggleList: () => any
}

export const DomainContext = createContext( {} as DomainContext )

interface DomainWrapper {
    data: Domain
    children: ReactNode
}

const DomainWrapper = ( { data: domain, children }: DomainWrapper ) => {

    const [ expanded, setExpanded ] = useState( false )

    const toggleList = () => {
        setExpanded( e => !e )
    }

    return (
      <DomainContext.Provider value={{ ...domain, expanded, toggleList }}>
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