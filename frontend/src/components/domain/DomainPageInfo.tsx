import { Chip, Divider, IconButton, Paper, Stack } from '@mui/material'
import { Refresh } from '@mui/icons-material'
import { useContext } from 'react'
import { DomainContext } from './DomainWrapper'

//TODO handle Sitemap refresh

const DomainPageInfo = () => {
    const { sitemapFound, pages_count } = useContext( DomainContext )

    return (
      <Stack direction={'row'} spacing={1}
             justifyContent={{ sm: 'flex-end', lg: 'center' }}
             alignItems={'center'} flexWrap={'wrap'}>
          <Chip label={'Sitemap'} color={sitemapFound ? 'success' : 'error'}/>
          <Chip label={`Pages: ${pages_count}`} color={'info'}/>
          <IconButton size={'small'} sx={{ opacity: .5 }}><Refresh/></IconButton>
      </Stack>
    )
}
export default DomainPageInfo