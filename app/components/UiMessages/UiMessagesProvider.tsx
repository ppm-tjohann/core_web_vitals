import { createContext, ReactNode, useState } from 'react'
import { Alert, AlertTitle, Box, Button, Container, Slide, Stack } from '@mui/material'



interface UiMessagesContext {
    test: string,
    setErrorMessage: ( {}: CustomAlert ) => void,
    setWarningMessage: ( {}: CustomAlert ) => void,
    setInfoMessage: ( {}: CustomAlert ) => void,
    setSuccessMessage: ( {}: CustomAlert ) => void,
}

export const UiMessagesContext = createContext( {} as UiMessagesContext )

interface CustomAlert {
    title: string,
    msg?: string,
}

interface TypedAlert extends CustomAlert {
    severity: 'error' | 'warning' | 'info' | 'success'
}

interface UiMessagesProviderProps {
    children: ReactNode
}

const UiMessagesProvider = ( { children }: UiMessagesProviderProps ) => {

    const [ messages, setMessages ] = useState<TypedAlert[]>( [] )

    const setErrorMessage = ( { title, msg }: CustomAlert ) => {
        handleMessage( { title, msg, severity: 'error' } )
    }
    const setWarningMessage = ( { title, msg }: CustomAlert ) => {
        handleMessage( { title, msg, severity: 'warning' } )
    }
    const setInfoMessage = ( { title, msg }: CustomAlert ) => {
        handleMessage( { title, msg, severity: 'info' } )
    }
    const setSuccessMessage = ( { title, msg }: CustomAlert ) => {
        handleMessage( { title, msg, severity: 'success' } )
    }

    const handleClick = () => {
        setSuccessMessage( { title: 'TEST MEssage' } )
    }

    const handleMessage = ( message: TypedAlert ) => {
        setMessages( [
            ...messages,
            message,
        ] )
    }

    const handleClose = ( index: number ) => () => {
        setMessages( msg => msg.filter( ( ms, i ) => i !== index ) )
    }

    return ( <UiMessagesContext.Provider value={{ test: 'TEST', setErrorMessage, setInfoMessage, setWarningMessage, setSuccessMessage }}>
          <>
              {children}
              <Button onClick={handleClick}>ADD</Button>
              <Box>
                  <Container sx={{ position: 'fixed', width: '100%', top: 0, right: 0, zIndex: 10 }} maxWidth={'sm'}>
                      <Stack>
                          {messages.map( ( msg, index ) => <Slide in={true} direction={'left'}>
                              <Alert severity={msg.severity} key={index} onClose={handleClose( index )}>
                                  {msg.msg && <AlertTitle>{msg.title}</AlertTitle>}
                                  {msg.msg ?? msg.title}
                              </Alert>
                          </Slide> )}
                      </Stack>
                  </Container>
              </Box>
          </>
      </UiMessagesContext.Provider>
    )
}
export default UiMessagesProvider