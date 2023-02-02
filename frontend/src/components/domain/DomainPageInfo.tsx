import { Chip, Divider, IconButton, Paper, Stack } from '@mui/material'
import { Refresh } from '@mui/icons-material'



const DomainPageInfo = () => {
    return (
      <Stack direction={'row'} spacing={1}
             justifyContent={{ sm: 'flex-end', lg: 'center' }}
             alignItems={'center'} flexWrap={'wrap'}>
          <Chip label={'Sitemap'} color={'success'}/>
          <Chip label={'Pages:123'} color={'info'}/>
          <IconButton size={'small'} sx={{ opacity: .5 }}><Refresh/></IconButton>
      </Stack>
    )
}
export default DomainPageInfo