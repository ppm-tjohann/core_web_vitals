import FlexBox from '../components/shared/FlexBox'
import { Box, Button, CircularProgress, Collapse, Container, Paper, Stack, TextField, Typography } from '@mui/material'
import { KeyboardEvent, ChangeEvent, useState } from 'react'



interface LoginValues {
    email: string
    password: string
}

interface LoginError {
    name: keyof LoginValues
    message: string
}

const Login = () => {

    const defaultValues: LoginValues = {
        email: '', password: '',
    }

    const [ values, setValues ] = useState<LoginValues>( defaultValues )
    const [ errors, setErrors ] = useState<LoginError[]>( [] )
    const [ loading, setLoading ] = useState( false )

    const handleChange = ( label: keyof LoginValues ) => ( event: ChangeEvent<HTMLInputElement> ) => {
        setValues( { ...values, [label]: event.target.value } )
    }

    const handleSubmit = async () => {
        setLoading( true )
        setTimeout( () => {
            setLoading( false )
        }, 1000 )
    }

    const handleKey = ( event: KeyboardEvent ) => {
        if ( event.key === 'Enter' ) {
            handleSubmit()
        }
    }

    return (
      <Box sx={{ width: '100vw', height: '100vh' }}>
          <FlexBox>
              <Container maxWidth={'sm'}>
                  <Paper sx={{ p: 8 }}>
                      <Typography variant={'h1'}>Login</Typography>
                      <Collapse in={!loading} unmountOnExit={false}>
                          <Stack spacing={2} my={4}>
                              <TextField onKeyDown={handleKey} label={'email'} type={'email'} value={values.email} onChange={handleChange( 'email' )}/>
                              <TextField onKeyDown={handleKey} label={'password'} type={'password'} value={values.password}
                                         onChange={handleChange( 'password' )}/>
                          </Stack>
                      </Collapse>
                      <Collapse in={loading}>
                          <FlexBox sx={{ p: 4 }}>
                              <CircularProgress/>
                          </FlexBox>
                      </Collapse>
                      <Button onClick={handleSubmit}>Login</Button>
                  </Paper>
              </Container>
          </FlexBox>
      </Box>
    )
}
export default Login