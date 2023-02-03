import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useContext } from 'react'
import { DomainContext } from './DomainWrapper'



const DomainInfo = () => {
    const { name, url, favicon } = useContext( DomainContext )
    return (
      <Stack direction={'row'} alignItems={'center'}>
          <Avatar src={favicon}/>
          <Box>
              <Typography variant={'h6'}>{name}</Typography>
              <Typography variant={'body2'} sx={{ opacity: .5 }}>{url}</Typography>
          </Box>
      </Stack>
    )
}
export default DomainInfo