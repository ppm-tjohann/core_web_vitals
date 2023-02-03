import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import DomainList from '../components/domain/DomainList'



const Dashboard = () => {
    return <Box p={{ xs: 2, md: 4, lg: 8 }}>

        <Grid container spacing={{ xs: 2, md: 4, lg: 8 }} alignItems={'stretch'}>
            <Grid item xs={12} xl={12}>
                <Paper>
                    <Typography variant={'h1'}>Core Web Vitals</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} xl={9}>
                <DomainList/>
            </Grid>
        </Grid>

    </Box>
}
export default Dashboard