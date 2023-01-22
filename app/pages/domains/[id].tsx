import { GetStaticPaths, GetStaticProps } from 'next'
import { DomainHandler } from '../../lib/api'
import { Domain } from '../../interfaces/DomainInterface'
import { useRouter } from 'next/router'
import Loading from '../../components/Loading'
import { Box, Button, Chip, Container, Grid, Paper, Stack } from '@mui/material'

import DomainHeader from '../../components/Domains/SingleDomain/DomainHeader'
import { ArrowLeft } from '@mui/icons-material'
import DomainActions from '../../components/Domains/DomainList/DomainActions'
import PageList from '../../components/Pages/PageList'



interface DomainPageProps {
    domain: Domain,
}

const DomainPage = ( { domain }: DomainPageProps ) => {

    const { isFallback, push } = useRouter()
    if ( isFallback ) {
        return <Loading/>
    }

    const handleClick = () => {
        push( '/domains' )
    }

    return ( <Box>
        <Container>
            <Grid container alignItems={'stretch'} justifyContent={'space-between'}>
                <Grid item xs={12} sm={4}>
                    <Paper>
                        <Button onClick={handleClick} startIcon={<ArrowLeft/>}>Domains</Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Paper>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Chip label={'Sitemap'} color={domain.sitemapFound ? 'success' : 'error'}/>
                            <DomainActions domain={domain}/>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <DomainHeader domain={domain}/>
                </Grid>
                {
                    domain.pages && <Grid item xs={12}>
                      <PageList pages={domain.pages} domain={domain}/>
                    </Grid>
                }
            </Grid>
        </Container>
    </Box> )
}

export const getStaticPaths: GetStaticPaths = async () => {

    const { data: domainPaths } = await DomainHandler.get()
    const paths = domainPaths.map( domain => ( {
        params: {
            id: domain.id.toString(),
        },
    } ) )

    return {
        paths,
        fallback: true,
    }
}
export const getStaticProps: GetStaticProps = async ( { params } ) => {

    const id = params?.id ?? 0
    const { data: domain } = await DomainHandler.findWithPages( id as number )

    return {
        props: { domain },
        revalidate: 10,
    }
}

export default DomainPage