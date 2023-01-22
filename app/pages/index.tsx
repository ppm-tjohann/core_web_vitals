import { Container, Grid, Stack, Typography } from '@mui/material'
import { Rating } from '../interfaces/RatingInterface'
import RatingList from '../components/Ratings/RatingList'
import { GetStaticProps } from 'next'
import { DomainHandler, PageHandler, RatingHandler } from '../lib/api'
import DomainList, { DomainListOptions } from '../components/Domains/DomainList'
import { Domain } from '../interfaces/DomainInterface'
import { Page } from '../interfaces/PageInterface'
import ErrorPageList from '../components/Pages/ErrorPageList'



interface HomeProps {
    ratings: Rating[],
    errorPages: Page[],
    domains: Domain[],
}

const Home = ( { errorPages, ratings, domains }: HomeProps ) => {

    console.log( 'Error Pages :', errorPages )

    const domainListOptions: DomainListOptions = {
        displayActions: false, displaySitemap: false, displayUpdate: false,
        displayPagesCount: false, averageVariant: 'small', hasDivider: false,
    }

    return (
      <Container>
          <Grid container>
              <Grid item xs={12} md={6}>
                  <Typography variant={'h1'}>Dashboard</Typography>
                  <Stack>
                      <DomainList domains={domains} options={domainListOptions}/>
                      <ErrorPageList pages={errorPages}/>
                  </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                  <RatingList ratings={ratings}/>
              </Grid>
          </Grid>
      </Container>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const [ domainsRes, ratingsRes, errorPagesRes ] = await Promise.all( [ DomainHandler.get(), RatingHandler.latest(), PageHandler.withErrors() ] )

    console.log( 'Errors : ', errorPagesRes.data )

    return {
        props: { ratings: ratingsRes.data, domains: domainsRes.data, errorPages: errorPagesRes.data },
        revalidate: 10,
    }
}

export default Home