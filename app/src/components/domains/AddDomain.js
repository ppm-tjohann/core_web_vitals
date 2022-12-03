import {useContext} from 'react'
import {AddDomainContext} from '../../provider/AddDomainProvider'
import CardPaper from '../dashboard/sizes/CardPaper'
import {Box, Button, Stack, Typography} from '@mui/material'
import {Add} from '@mui/icons-material'
import styled from '@emotion/styled'
import MuiInputBase from '@mui/material/InputBase'
import CustomInput from '../shared/CustomInput'

const AddDomain = () => {
  const {
    loading, errors, values, handleChange, handleSubmit, handleReset,
  } = useContext(AddDomainContext)

  console.log('ERRORS:', errors)

  return (<CardPaper sx={{display: 'block'}} loading={loading}>
    <Typography variant={'h6'}>Add Domain</Typography>
    <Box component={'form'}>
      <Stack spacing={3} mt={3} mb={0}>
        <CustomInput label={'Name'} placeholder={'https://www.website.de'}
                     error={errors.name}
                     value={values.name} onChange={handleChange('name')}
        />
        <Stack direction={'row'} spacing={3}>
          <CustomInput placeholder={'Sitemap-URL'} error={errors.sitemap}
                       onChange={handleChange('sitemap')} value={values.sitemap}
                       label={'Sitemap-url'}/>
          <CustomInput placeholder={'Favicon-URL'} label={'Favicon-url'}
                       onChange={handleChange('favicon')} value={values.favicon}
                       error={errors.favicon}/>
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-end'} spacing={1}>
          <Button onClick={handleReset}>Clear</Button>
          <Button variant={'contained'} endIcon={<Add/>}
                  onClick={handleSubmit}>Add</Button>
        </Stack>
      </Stack>
    </Box>
  </CardPaper>)
}
export default AddDomain