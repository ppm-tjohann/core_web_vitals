import {Box} from '@mui/material'

const CardHeader = ({disablePadding, children}) => {
  return (<Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    pb: disablePadding ? 0 : 3,
  }}>
    {children}
  </Box>)
}
export default CardHeader