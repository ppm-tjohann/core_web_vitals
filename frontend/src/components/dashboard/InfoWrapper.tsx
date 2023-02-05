import { CircularProgress, Collapse, Paper, Skeleton, Typography } from '@mui/material'



interface InfoWrapper {
    loading?: boolean
    headline: string
    info: string | number
    bgColor?: any
}

const InfoWrapper = ( { bgColor = 'default', loading, headline, info }: InfoWrapper ) => {
    return (
      <Paper sx={{ backgroundColor: bgColor, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' }}>
          <Typography mb={2} textAlign={'center'} variant={'h6'}>{headline}</Typography>
          <Collapse in={!loading}>
              <Typography variant={'h2'} textAlign={'center'}>
                  {info}
              </Typography>
          </Collapse>
          {loading && <CircularProgress/>}
      </Paper>
    )
}

export default InfoWrapper