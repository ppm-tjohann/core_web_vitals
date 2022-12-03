import {
  Box,
  CircularProgress,
  Collapse,
  Grid,
  List,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Zoom,
} from '@mui/material'
import {useEffect, useState} from 'react'
import RatingChip from '../shared/RatingChip'
import Favicon from '../shared/Favicon'
import {TransitionGroup} from 'react-transition-group'
import ListItemButton from '@mui/material/ListItemButton'
import {ChevronRight} from '@mui/icons-material'
import CardPaper from './sizes/CardPaper'
import IconButton from '@mui/material/IconButton'
import Page from '../../lib/api/Page'

const PageItem = ({metric}) => {
  return (<Box sx={{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }}>
    <ListItemIcon>
      <Favicon domain={metric.page.domain}/>
    </ListItemIcon>
    <ListItemText
        primary={`${metric.page.url.replace(metric.page.domain.name, '')}`}
        secondary={metric.page.domain.name.replace('https://', '')}/>

    <Stack direction={'row'} spacing={1} width={120} alignItems={'center'}
           mx={6}
           justifyContent={'space-around'}>
      <RatingChip displayAverage={true}
                  domain={metric.page.domain.average_performance * 100}
                  rating={metric.performance * 100}/>
      <RatingChip displayAverage={true}
                  domain={metric.page.domain.average_seo * 100}
                  rating={metric.seo * 100}/>
      <RatingChip displayAverage={true}
                  domain={metric.page.domain.average_accessibility * 100}
                  rating={metric.accessibility * 100}/>

    </Stack>
    <IconButton sx={{ml: 3}}>
      <ChevronRight/>
    </IconButton>
  </Box>)
}
const PageList = ({metrics}) => {
  return (<List disablePadding>
    <TransitionGroup>
      {metrics.map(metric => (<Collapse key={metric.id}>
        <ListItemButton>
          <PageItem metric={metric}/>
        </ListItemButton>
      </Collapse>))}
    </TransitionGroup>
  </List>)
}

const RecentPagesList = () => {

  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const {data: metrics} = await Page.fetchRecentChecked()
      setMetrics(metrics)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (<Grid item xs={12} md={12}>

    <CardPaper sx={{display: 'block'}}>
      <Stack sx={{mb: 3}}
             direction={'row'} alignItems={'center'}
             justifyContent={'space-between'}>
        <Typography variant={'h5'}>Recently Checked Pages</Typography>
        <IconButton>
          <ChevronRight/>
        </IconButton>
      </Stack>
      {loading ? <CircularProgress/> : <Zoom in={!loading}>
        <Box>
          <PageList metrics={metrics}/>
        </Box>
      </Zoom>}
    </CardPaper>

  </Grid>)
}
export default RecentPagesList