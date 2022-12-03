import {
  Box, Button, Container, Grid, Stack, TextField, Typography,
} from '@mui/material'
import DomainList from '../components/dashboard/DomainList'
import CardPaper from '../components/dashboard/sizes/CardPaper'
import {Add} from '@mui/icons-material'
import styled from '@emotion/styled'
import MuiInputBase from '@mui/material/InputBase'
import AddDomain from '../components/domains/AddDomain'
import CardHeader from '../components/shared/CardHeader'
import AverageRating from '../components/dashboard/AverageRating'

const DomainListPage = () => {
  return (<Box>
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Typography variant={'h3'}>Domainlist</Typography>
      </Grid>
      <Grid container spacing={5} item xs={12}>
        <Grid item xs={12} md={6}>
          <AddDomain/>
        </Grid>
        <Grid item xs={12} md={6} container spacing={6}>
          <AverageRating label={'performance'}/>
          <AverageRating label={'seo'}/>
          <AverageRating label={'accessibility'}/>
        </Grid>
      </Grid>

      <DomainList size={12}/>

    </Grid>
  </Box>)
}
export default DomainListPage