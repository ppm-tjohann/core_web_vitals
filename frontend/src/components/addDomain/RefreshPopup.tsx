import { useContext, useState } from 'react'
import { Box, Button, CircularProgress, Collapse, Container, Modal, Paper, Stack, Typography } from '@mui/material'
import { DomainContext } from '../domain/DomainWrapper'
import FlexBox from '../shared/FlexBox'
import api from '../../lib/api'



interface RefreshPopup {
    open: boolean
    handleClose: () => any
}

const RefreshPopup = ( { open, handleClose }: RefreshPopup ) => {

    const [ loading, setLoading ] = useState( false )
    const [ error, setError ] = useState( false )
    const { id, name } = useContext( DomainContext )

    const handleRefresh = async () => {
        try {
            setLoading( true )
            await api.get( `domain/${id}/sitemap` )
            setLoading( false )
            handleClose()
        }
        catch ( e ) {
            setError( true )
            console.error( 'Refreshing Sitemap failed', e )
        }
        setLoading( false )

    }

    return ( <Modal open={open} onClose={handleClose}>
          <FlexBox>
              <Container maxWidth={'sm'}>
                  <Paper sx={{ position: 'relative' }}>
                      {loading && <FlexBox sx={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                        <CircularProgress/>
                      </FlexBox>}
                      <Box sx={{ transition: `opacity 250ms ease-in-out `, opacity: loading ? .5 : 1 }}>
                          <Typography variant={'h5'}>Refresh Sitemap</Typography>
                          {error && <Paper elevation={1} sx={{ p: 2, my: 2, backgroundColor: 'error.dark', display: 'inline-block' }}>
                            <Typography variant={'body1'}>Refreshing Sitemap failed. Please try again later</Typography>
                          </Paper>}

                          <Typography mt={2} variant={'body1'}>Refreshing Sitemap for {name} will delete all related Pages.</Typography>
                          <Stack mt={4} direction={'row'} justifyContent={'flex-end'}>
                              <Button variant={'text'} onClick={handleClose}>Cancel</Button>
                              <Button onClick={handleRefresh} disabled={error}>Refresh Sitemap</Button>
                          </Stack>
                      </Box>
                  </Paper>
              </Container>
          </FlexBox>
      </Modal>
    )

}
export default RefreshPopup