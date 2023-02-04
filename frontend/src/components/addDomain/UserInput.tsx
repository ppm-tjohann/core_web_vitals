import { TextField } from '@mui/material'
import { AddDomainRequest } from '../../types/Domain'
import { useContext } from 'react'
import { AddDomainContext } from './AddDomainForm'



interface UserInput {
    label: keyof AddDomainRequest
}

const UserInput = ( { label }: UserInput ) => {

    const { values, errors, handleChange } = useContext( AddDomainContext )
    console.log( 'Validating:', errors.includes( label ), label )

    return (
      <TextField fullWidth label={label} value={values[label]} onChange={handleChange( label )} error={errors.includes( label )}/>
    )
}
export default UserInput