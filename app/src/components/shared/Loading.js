import {CircularProgress, Container} from '@mui/material'

const Loading = ({loading, children}) => {
  if (loading) {
    return (<Container sx={{
      my: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <CircularProgress/>
    </Container>)
  }

  return (<>{children}</>)

}

export default Loading