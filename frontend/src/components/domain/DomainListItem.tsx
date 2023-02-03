import { Box, Chip, Collapse, Grid, Stack, Typography } from '@mui/material'
import DomainRatings from './DomainRatings'
import DomainPageInfo from './DomainPageInfo'
import DomainInfo from './DomainInfo'
import DomainActions from './DomainActions'
import { Domain } from '../../types/Domain'
import DomainWrapper from './DomainWrapper'



const DomainListItem = ( domain: Domain ) => {

    return (
      <DomainWrapper data={domain}>
          <Grid container justifyContent={'space-between'} alignItems={'center'} sx={{ my: 4 }} spacing={2}>
              <Grid item xs={12} sm={8} lg={4}><DomainInfo/></Grid>
              <Grid item xs={12} sm={4} lg={3}><DomainPageInfo/></Grid>
              <Grid item xs={10} sm={8} lg={3}><DomainRatings/></Grid>
              <Grid item xs={'auto'}><DomainActions/></Grid>
          </Grid>
      </DomainWrapper>
    )
}
export default DomainListItem