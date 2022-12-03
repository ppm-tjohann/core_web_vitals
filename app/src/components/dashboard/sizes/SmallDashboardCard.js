import {CircularProgress, Grid, Paper, Typography} from '@mui/material'
import CardPaper from './CardPaper'
import AnimatedNumber from 'animated-number-react'
import {useRef} from 'react'

const SmallDashboardCard = ({
  primary = '00', secondary = 'Text', loading = false, sx,
}) => {

  return (<Grid item xs={4}>
    <CardPaper loading={loading}
               sx={{justifyContent: 'center', py: 1, px: 2, ...sx}}>

      <Typography variant={'h3'} textAlign={'center'}
                  sx={{mb: 1}}>
        <AnimatedNumber value={primary}
                        formatValue={value => value.toFixed(0)}/>
      </Typography>
      <Typography textAlign={'center'}
                  variant={'subtitle2'}>{secondary}</Typography>

    </CardPaper>
  </Grid>)
}
export default SmallDashboardCard