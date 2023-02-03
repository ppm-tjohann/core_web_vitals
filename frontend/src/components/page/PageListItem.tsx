import { Box, Chip, Collapse, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import RatingStack from '../rating/RatingStack'
import { Page } from '../../types/Page'
import moment from 'moment'
import { useContext, useState } from 'react'
import { DomainContext } from '../domain/DomainWrapper'



const PageListItem = ( { url, updated_at, error, average_ratings }: Page ) => {

    const { url: domainUrl } = useContext( DomainContext )
    const [ hovered, setHover ] = useState( false )

    const handleEnter = () => {
        setHover( true )
    }
    const handleLeave = () => {
        setHover( false )
    }

    return (
      <Box sx={{
          py: 3,
          px: 2, backgroundColor: error === 1 ? 'error.main' : 'none', transition: 'all 250ms ease-in-out',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0))',
          ':hover': {
              backgroundImage: 'linear-gradient(rgba(255,255,255,.1),rgba(255,255,255,.1))',
          },
      }}>
          <Grid container justifyContent={'space-between'} alignItems={'center'} spacing={2}>
              <Grid item xs={12} md={6}> <Typography variant={'body1'} sx={{ lineBreak: 'anywhere' }}>{url.replace( domainUrl, '' )}</Typography></Grid>
              <Grid item xs={6} sm={3}> <RatingStack data={average_ratings}/></Grid>
              <Grid item xs={6} sm={'auto'}> <Chip label={moment( updated_at ).fromNow()} sx={{ opacity: .5 }}/></Grid>
          </Grid>
      </Box>
    )
}
export default PageListItem