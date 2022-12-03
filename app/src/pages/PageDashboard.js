import {Box, Container, Grid, Typography} from '@mui/material'
import {useState} from 'react'
import Loading from '../components/shared/Loading'
import FirstContentfulPaint from '../components/vitals/FirstContentfulPaint'
import CummulativeLayoutShift from '../components/vitals/CummulativeLayoutShift'
import LargestContentfulPaint from '../components/vitals/LargestContentfulPaint'
import FirstInputDelay from '../components/vitals/FirstInputDelay'

const DUMMY_DATA = {
  FCP: {good: 80, improvement: 20, poor: 0},
  CLS: {good: 0, improvement: 80, poor: 20},
  LCP: {good: 10, improvement: 90, poor: 0},
  FID: {good: 100, improvement: 0, poor: 0},
}

const PageDashboard = ({domain}) => {

  const [data, setData] = useState(DUMMY_DATA)
  const [loading, setLoading] = useState(false)

  return (<Loading loading={loading}>
    <Container sx={{my: 12}}>
      <Box sx={{mb: 6}}>
        <Typography variant={'h2'}>
          Domain-Name
        </Typography>
        <Typography variant={'subtitle1'}>
          Page Dashboard
        </Typography>

      </Box>
      <Grid container spacing={3}> < Grid item xs={12} md={6}>
        <FirstContentfulPaint data={data.FCP}/>
      </Grid>
        <Grid item xs={12} md={6}>
          <CummulativeLayoutShift data={data.CLS}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <LargestContentfulPaint data={data.LCP}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <FirstInputDelay data={data.FID}/>
        </Grid>

      </Grid>

    </Container>
  </Loading>)
}
export default PageDashboard