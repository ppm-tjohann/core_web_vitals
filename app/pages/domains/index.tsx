import { Container, Grid, Typography } from '@mui/material'
import AddDomain from '../../components/Domains/AddDomain'
import { GetStaticProps } from 'next'
import { DomainHandler } from '../../lib/api'
import { Domain } from '../../interfaces/DomainInterface'
import DomainList from '../../components/Domains/DomainList'
import DomainProvider from '../../components/Domains/DomainProvider'



interface DomainsProps {
    domains: Domain[],
}

const Domains = ( { domains }: DomainsProps ) => {
    return (
      <DomainProvider domains={domains}>
          <Container>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <Typography variant={'h1'}>Domains</Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <AddDomain/>
                  </Grid>
                  <Grid item xs={12}>
                      <DomainList domains={domains}/>
                  </Grid>
              </Grid>
          </Container>
      </DomainProvider>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const { data: domains } = await DomainHandler.get()
    console.log( 'Domains :', domains )
    return {
        props: { domains },
        revalidate: 60,
    }
}

export default Domains