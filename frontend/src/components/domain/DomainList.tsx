import { useEffect, useMemo, useState } from 'react'
import { CircularProgress, Collapse, Divider, Paper, Stack } from '@mui/material'
import DomainListItem from './DomainListItem'
import api from '../../lib/api'
import { Simulate } from 'react-dom/test-utils'
import error = Simulate.error
import { Domain } from '../../types/Domain'
import { TransitionGroup } from 'react-transition-group'
import FlexBox from '../shared/FlexBox'



const DomainList = () => {

    const [ loading, setLoading ] = useState( true )
    const [ domains, setDomains ] = useState<Domain[]>( [] )
    useEffect( () => {
        setLoading( true )
        api.get( 'domain' ).then( res => {
            console.log( res.data )
            setDomains( res.data )
        } )
        setLoading( false )

    }, [] )

    return (
      <Paper>
          <Collapse in={loading}>
              <FlexBox>
                  <CircularProgress/>
              </FlexBox>
          </Collapse>
          <Collapse in={!loading && domains !== undefined}>
              <TransitionGroup>
                  {domains.map( domain => <Collapse key={domain.id}>
                      <DomainListItem {...domain}/>
                  </Collapse> )}
              </TransitionGroup>
          </Collapse>
      </Paper>
    )

}
export default DomainList