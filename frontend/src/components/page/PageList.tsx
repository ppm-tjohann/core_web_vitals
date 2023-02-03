import { Box, CircularProgress, Collapse, Container, Divider, Paper, Stack } from '@mui/material'
import PageListItem from './PageListItem'
import { useContext, useEffect, useState } from 'react'
import api from '../../lib/api'
import { DomainContext } from '../domain/DomainWrapper'
import { Page } from '../../types/Page'
import { Simulate } from 'react-dom/test-utils'
import { TransitionGroup } from 'react-transition-group'
import FlexBox from '../shared/FlexBox'



const PageList = () => {

    const [ loading, setLoading ] = useState( true )
    const [ pages, setPages ] = useState( [] as Page[] )
    const { id: domainId, expanded } = useContext( DomainContext )

    useEffect( () => {
        if ( expanded ) {
            setLoading( true )
            api.get( `pages?filter[domain_id]=${domainId}` ).then( res => {
                setPages( res.data )
                console.log( 'Pages:', res.data )
            } ).catch( e => {
                console.error( 'Fetching Pages failed' )
            } )
            setLoading( false )
        }
    }, [ expanded ] )

    return (
      <Paper elevation={1} sx={{ my: 2, p: 0, overflow: 'hidden' }}>
          <Collapse in={loading}>
              <Box py={2}>
                  <FlexBox>
                      <CircularProgress/>
                  </FlexBox>
              </Box>
          </Collapse>
          {!loading && <Stack divider={<Divider flexItem/>} sx={{ maxHeight: 500, overflowY: 'scroll' }}>
            <TransitionGroup>
                {pages.map( page => ( <Collapse key={page.id}><PageListItem {...page}/></Collapse> ) )}
            </TransitionGroup>
          </Stack>}
      </Paper>
    )
}
export default PageList