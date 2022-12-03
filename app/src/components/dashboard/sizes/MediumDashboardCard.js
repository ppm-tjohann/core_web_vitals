import {Grid, Paper} from '@mui/material'
import CardPaper from './CardPaper'

const MediumDashboardCard = ({children, loading, size = 6}) => {
  return (<Grid item xs={12} xl={size}>
    <CardPaper loading={loading}>
      {children}
    </CardPaper>
  </Grid>)
}
export default MediumDashboardCard