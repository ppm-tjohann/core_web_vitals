import { Box, Button, Collapse, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { Add, ExpandMore } from '@mui/icons-material'
import { useState } from 'react'
import AddDomainForm from './AddDomainForm'



const AddDomain = () => {
    const [ expanded, setExpanded ] = useState( false )
    const toggleForm = () => {
        setExpanded( e => !e )
    }

    return (
      <Paper>
          <Box>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography variant={'h4'}>Add Domain</Typography>
                  <IconButton onClick={toggleForm} sx={{
                      transition: 'all 250ms ease-in-out',
                      transform: `rotate(${expanded ? 180 : 0}deg)`,
                  }}><ExpandMore/></IconButton>
              </Stack>
          </Box>
          <Collapse in={expanded}>
              <AddDomainForm onSuccess={toggleForm}/>
          </Collapse>


      </Paper>
    )
}
export default AddDomain