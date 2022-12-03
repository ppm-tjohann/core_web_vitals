import {Box, useTheme} from '@mui/material'

const Slide = ({good, improvements, poor}) => {

  const theme = useTheme()

  return (<Box sx={{
    mt: 3, borderRadius: theme.spacing(3), display: 'flex', overflow: 'hidden',
  }}>
    <Box sx={{
      width: `${good}%`,
      height: 20,
      mr: improvements === 0 && poor === 0 ? 3 : 0,
      background: theme.palette.success.main,
      borderRadius: theme.spacing(0, 3, 3, 0),
      position: 'relative',
      zIndex: 3,
    }}/>
    <Box sx={{
      width: `${improvements}%`,
      height: 20,
      background: theme.palette.warning.main,
      borderRadius: theme.spacing(0, 3, 3, 0),
      ml: -1,
      mr: poor === 0 && improvements !== 0 ? 1 : 0,
      position: 'relative',
      zIndex: 2,
    }}/>
    <Box sx={{
      width: `${poor}%`,
      height: 20,
      background: theme.palette.error.main,
      borderRadius: theme.spacing(0, 3, 3, 0),
      ml: -1,
      position: 'relative',
      zIndex: 1,
    }}/>
  </Box>)
}
export default Slide