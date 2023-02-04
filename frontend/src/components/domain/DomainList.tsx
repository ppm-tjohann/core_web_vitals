import { useContext, useEffect, useMemo, useState } from 'react'
import { CircularProgress, Collapse, Divider, Paper, Stack } from '@mui/material'
import DomainListItem from './DomainListItem'
import api from '../../lib/api'
import { Simulate } from 'react-dom/test-utils'
import error = Simulate.error
import { Domain } from '../../types/Domain'
import { TransitionGroup } from 'react-transition-group'
import FlexBox from '../shared/FlexBox'
import { DomainListContext } from '../../pages/Dashboard'



const DomainList = () => {

    const { loading, domains } = useContext( DomainListContext )

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