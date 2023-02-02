import { Avatar, Box, Stack, Typography } from '@mui/material'



const DomainInfo = () => {
    return (

      <Stack direction={'row'} alignItems={'center'}>
          <Avatar>FI</Avatar>
          <Box>
              <Typography variant={'h5'}>Domainname</Typography>
              <Typography variant={'caption'} sx={{ opacity: .5 }}>https://www.waldkliniken-eisenberg.de</Typography>
          </Box>
      </Stack>
    )
}
export default DomainInfo