import { Box, CircularProgress, Container } from '@mui/material'



interface LoadingProps {
    loading?: boolean
}

const Loading = ( { loading = true }: LoadingProps ) => {

    if ( loading ) {
        return <Box>
            <Container>
                <CircularProgress/>
            </Container>
        </Box>
    }
    else return null

}

export default Loading
