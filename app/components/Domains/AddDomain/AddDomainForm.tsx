import { Box, Button, Paper, Stack, styled, Typography } from '@mui/material'
import MuiTextField from '@mui/material/TextField'
import { useContext } from 'react'
import { AddDomainContext } from './AddDomainProvider'
import { BaseDomain } from '../../../interfaces/DomainInterface'
import keysOf from '../../../lib/keysOf'
import { LoadingButton } from '@mui/lab'
import { Add } from '@mui/icons-material'



const TextField = styled( MuiTextField )( ( { theme } ) => ( {} ) )

interface FormInputProps {
    name: keyof BaseDomain,
    index: number,

    [x: string]: any,
}

const FormInput = ( { name, index }: FormInputProps ) => {
    const { values, handleChange, errors } = useContext( AddDomainContext )
    const hasError = name in errors

    if ( name in values )
        return <TextField key={index} label={name} value={values[name]} onChange={handleChange( name )} error={hasError}
                          helperText={errors[name] ?? ''}/>
    return null
}

const AddDomainForm = () => {

    const { values, handleSubmit, loading } = useContext( AddDomainContext )

    return (
      <Paper>
          <Typography variant={'h2'}>Add Domain</Typography>
          <Stack component={'form'} sx={{ my: 3 }} direction={'row'}>
              {
                  keysOf( values ).map( ( name, index ) => <FormInput name={name} index={index}/> )
              }
              <LoadingButton variant={'contained'} startIcon={<Add/>} loading={loading} onClick={handleSubmit}>Add</LoadingButton>
          </Stack>
      </Paper>
    )
}
export default AddDomainForm