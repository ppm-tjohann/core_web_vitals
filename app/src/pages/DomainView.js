import {useEffect, useState} from 'react'
import Domain from '../lib/api/Domain'
import {
  Box, CircularProgress, Grid, Skeleton, Stack, Typography,
} from '@mui/material'
import {useParams} from 'react-router'
import Favicon from '../components/shared/Favicon'

const DomainView = (data) => {

  const {id} = useParams()

  const [loading, setLoading] = useState(true)
  const [domain, setDomain] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const {data: newDomain} = await Domain.get(id)
      console.log('NEW DOMAIN :', newDomain)
      setDomain(newDomain)
      setLoading(false)
    }
    fetchData()
    console.log('DOMAIN VIEW :', domain)
  }, [])

  if (loading) {
    return <Box
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
      <CircularProgress/>
    </Box>
  }

  return (<Box>
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Favicon domain={domain}/>
            <Typography variant={'h3'}>{domain.name}</Typography>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  </Box>)

}
export default DomainView