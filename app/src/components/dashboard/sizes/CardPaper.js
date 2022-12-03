import {Box, CircularProgress, Collapse, Paper, Zoom} from '@mui/material'

const CardPaper = ({children, loading = false, sx}) => {

  const defaultProps = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: loading ? 'center' : 'flex-start',
    flexDirection: 'column',
    p: 4,
  }

  const paperSx = loading ? defaultProps : {...defaultProps, ...sx}

  return (<Paper sx={paperSx}>{loading ?
      <CircularProgress/> :
      <Collapse sx={{width: '100%'}} in={true}><Box>{children}</Box></Collapse>}
  </Paper>)
}
export default CardPaper