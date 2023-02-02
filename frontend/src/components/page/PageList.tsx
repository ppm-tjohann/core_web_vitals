import { Box, Container, Divider, Paper, Stack } from '@mui/material'
import PageListItem from './PageListItem'



const PageList = () => {
    return (
      <Paper elevation={1} sx={{ my: 2, p: 0, overflow: 'hidden' }}>
          <Stack divider={<Divider flexItem/>} spacing={0} sx={{ maxHeight: 500, overflowY: 'scroll' }}>
              <PageListItem/>
              <PageListItem/>
              <PageListItem/>
              <PageListItem/>
              <PageListItem/>
              <PageListItem/>
          </Stack>
      </Paper>
    )
}
export default PageList