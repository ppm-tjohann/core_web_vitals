import { Chip, IconButton, Stack } from '@mui/material'
import { Refresh } from '@mui/icons-material'
import { useContext, useState } from 'react'
import { DomainContext } from './DomainWrapper'
import RefreshPopup from '../addDomain/RefreshPopup'

//TODO handle Sitemap refresh

const DomainPageInfo = () => {
    const { sitemapFound, pages_count, id } = useContext( DomainContext )
    const [ open, setOpen ] = useState( false )

    const togglePopup = () => {
        setOpen( o => !o )
    }

    const handleRefresh = () => {

    }

    return (
      <>
          <Stack direction={'row'} spacing={1} justifyContent={{ sm: 'flex-end', lg: 'center' }} alignItems={'center'} flexWrap={'wrap'}>
              <Chip label={'Map'} color={sitemapFound ? 'success' : 'error'}/>
              <Chip label={`Pages: ${pages_count}`} color={'info'}/>
              <IconButton size={'small'} onClick={togglePopup} sx={{ opacity: .5 }}><Refresh/></IconButton>
          </Stack>
          <RefreshPopup open={open} handleClose={togglePopup}/>
      </>
    )
}
export default DomainPageInfo