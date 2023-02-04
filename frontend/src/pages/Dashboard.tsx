import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import DomainList from '../components/domain/DomainList'
import AddDomain from '../components/addDomain'
import { createContext, useEffect, useState } from 'react'
import { Domain } from '../types/Domain'
import api from '../lib/api'



interface DomainListContext {
    domains: Domain[],
    loading: boolean
    handleAddDomain: ( domain: Domain ) => void
}

export const DomainListContext = createContext<DomainListContext>( {} as DomainListContext )

const Dashboard = () => {
    const [ loading, setLoading ] = useState( true )
    const [ domains, setDomains ] = useState<Domain[]>( [] )
    useEffect( () => {
        setLoading( true )
        api.get( 'domain' ).then( res => {
            console.log( res.data )
            setDomains( res.data )
        } )
        setLoading( false )

    }, [] )

    const handleAddDomain = ( domain: Domain ) => {
        setDomains( [ domain, ...domains ] )
    }

    return <Box p={{ xs: 2, md: 4, lg: 8 }}>
        <DomainListContext.Provider value={{ domains, loading, handleAddDomain }}>
            <Grid container spacing={{ xs: 2, md: 4, lg: 8 }} alignItems={'stretch'}>
                <Grid item xs={12} xl={12}>
                    <Paper>
                        <Typography variant={'h1'}>Core Web Vitals</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <AddDomain/>
                </Grid>
                <Grid item xs={12} xl={9}>
                    <DomainList/>
                </Grid>
            </Grid>
        </DomainListContext.Provider>

    </Box>
}
export default Dashboard