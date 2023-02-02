import { useEffect, useState } from 'react'
import { Divider, Paper, Stack } from '@mui/material'
import DomainListItem from './DomainListItem'



const DomainList = () => {

    const [ loading, setLoading ] = useState( false )

    useEffect( () => {

    }, [] )

    return (
      <Paper>
          <Stack spacing={4} divider={<Divider flexItem/>}>
              <DomainListItem/>
              <DomainListItem/>
              <DomainListItem/>
              <DomainListItem/>
              <DomainListItem/>
          </Stack>
      </Paper>
    )

}
export default DomainList