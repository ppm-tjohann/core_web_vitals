import { Box, Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import { ArrowCircleRight, Refresh } from '@mui/icons-material'
import { Page } from '../../../interfaces/PageInterface'
import moment from 'moment'



interface ErrorPageListProps {
    pages: Page[]
}

const ErrorPageList = ( { pages }: ErrorPageListProps ) => {

    const handleClick = ( url: string ) => () => window.open( url, '_blank' )

    return (
      <Paper>
          <Typography variant={'h4'} mb={3}>Error Pages</Typography>
          <Stack>
              {pages.map( page => (
                <Stack alignItems={'center'} justifyContent={'space-between'} direction={'row'}>
                    <Box>
                        <Typography variant={'body1'}>{page.url}</Typography>
                        <Typography variant={'body2'} sx={{ opacity: .7 }}>{moment( page.updated_at ).fromNow()}</Typography>
                    </Box>
                    <Box>
                        <IconButton><Refresh/></IconButton>
                        <Button sx={{ flexShrink: 0 }} onClick={handleClick( page.url )}>Visit Page</Button>
                    </Box>
                </Stack>
              ) )}
          </Stack>
      </Paper>
    )

}
export default ErrorPageList