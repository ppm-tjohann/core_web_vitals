import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import DomainList from '../components/domain/DomainList'



const Dashboard = () => {
    return <Box p={8}>

        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Paper>
                    <Typography variant={'h1'}>Dashboard</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} xl={8}>
                <DomainList/>
            </Grid>
        </Grid>

    </Box>
}
export default Dashboard