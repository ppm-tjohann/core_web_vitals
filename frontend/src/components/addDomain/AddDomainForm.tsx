import { ChangeEvent, createContext, useContext, useState } from 'react'
import { AddDomainRequest, Domain } from '../../types/Domain'
import { Box, Button, CircularProgress, Collapse, Stack, TextField, Zoom } from '@mui/material'
import { Add } from '@mui/icons-material'
import FlexBox from '../shared/FlexBox'
import { ZodError } from 'zod'
import UserInput from './UserInput'
import axios from 'axios'
import api from '../../lib/api'
import { DomainListContext } from '../../pages/Dashboard'



type error = keyof AddDomainRequest

interface AddDomainContext {
    values: AddDomainRequest,
    errors: error[],
    handleChange: ( label: keyof AddDomainRequest ) => any
}

export const AddDomainContext = createContext( {} as AddDomainContext )

const AddDomainForm = ( { onSuccess }: { onSuccess?: () => any } ) => {

    const defaultValues: AddDomainRequest = { name: '', sitemap: '', favicon: '', url: '' }
    const { handleAddDomain } = useContext( DomainListContext )

    const [ values, setValues ] = useState<AddDomainRequest>( defaultValues )
    const [ loading, setLoading ] = useState( false )
    const [ errors, setErrors ] = useState<error[]>( [] )

    const handleChange = ( label: keyof AddDomainRequest ) => ( event: ChangeEvent<HTMLInputElement> ) => {
        setValues( { ...values, [label]: event.target.value } )
    }
    const handleSubmit = async () => {
        setLoading( true )
        try {
            Domain.parse( values )
            const { data: domain } = await api.post( 'domain', values )
            handleAddDomain( domain )
            setValues( defaultValues )
            if ( onSuccess )
                onSuccess()

        }
        catch ( e ) {
            if ( e instanceof ZodError ) {
                console.log( e )
                setErrors( e.issues.map( issue => issue.path[0] ) as error[] )
            }
        }
        setLoading( false )
    }

    return ( <Box component={'form'} my={4} sx={{ position: 'relative' }}>
          <Collapse in={loading}>
              <FlexBox sx={{ position: 'absolute', left: 0, top: 0 }}>
                  <CircularProgress/>
              </FlexBox>
          </Collapse>
          <AddDomainContext.Provider value={{ values, handleChange, errors }}>
              <Stack alignItems={'flex-end'} sx={{ opacity: loading ? .25 : 1, transition: 'opacity 250ms ease-in-out' }}>
                  <UserInput label={'name'}/>
                  <UserInput label={'url'}/>
                  <Stack direction={'row'} width={'100%'}>
                      <UserInput label={'favicon'}/>
                      <UserInput label={'sitemap'}/>
                  </Stack>
                  <Box><Button startIcon={<Add/>} onClick={handleSubmit}>Add</Button></Box>
              </Stack>
          </AddDomainContext.Provider>
      </Box>
    )

}
export default AddDomainForm