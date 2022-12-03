import {Grid, Paper} from '@mui/material'
import SmallDashboardCard
  from '../components/dashboard/sizes/SmallDashboardCard'
import NumberOfDomainsCard from '../components/dashboard/NumberOfDomainsCard'

import DomainList from '../components/dashboard/DomainList'
import AverageRating from '../components/dashboard/AverageRating'
import NumberOfPages from '../components/dashboard/NumberOfPages'
import RecentPagesList from '../components/dashboard/RecentPagesList'
import TransitionGroupExample from '../components/shared/TransitionTest'
import ErrorPages from '../components/dashboard/ErrorPages'

const Dashboard = () => {
  return (
      <Grid container spacing={6} alignItems={'stretch'} sx={{height: '100%'}}>
        <DomainList showHeader/>
        <Grid item xs={12} xl={6} container spacing={6}>
          <AverageRating label={'performance'}/>
          <AverageRating label={'seo'}/>
          <AverageRating label={'accessibility'}/>
          <NumberOfDomainsCard/>
          <NumberOfPages/>
          <ErrorPages/>
          <RecentPagesList/>
        </Grid>
      </Grid>)
}
export default Dashboard